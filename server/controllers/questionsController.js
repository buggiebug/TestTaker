const QuestionsModel = require("../models/questionModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const SearchFeature = require("../utils/searchFeature");

const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

//  //! ----------- New Question -----------
exports.createQuestion = catchAsyncError(async (req, res) => {
  const {
    questionCategory,
    questionType,
    questionName,
    option_1,
    option_2,
    option_3,
    option_4,
    right_Answer,
  } = req.body;
  const admin = req.admin.id;
  const questions = await QuestionsModel.create({
    questionCategory: String(
      questionCategory.charAt(0).toUpperCase() + questionCategory.slice(1)
    )
      .replace(/\s+/g, " ")
      .trim(),
    questionType,
    questionName,
    option_1,
    option_2,
    option_3,
    option_4,
    right_Answer,
    questionMakerId: admin,
  });

  myCache.del(String(questionCategory)?.toLowerCase());
  myCache.del("allSubjects");

  return res.status(201).json({ success: true, questions });
});

//  //! Get all subjects name...
exports.allSubjectsName = catchAsyncError(async (req, res, next) => {

  //  //* Search by subject name...
  const _subject = req.query?.subject;

  if (!_subject) {
    const isSubject = await myCache.get("allSubjects");
    if (isSubject) {
      const data = {
        totalSubjectCount: isSubject?.totalSubjectCount, totalSubjects: isSubject?.totalSubjects, countNoOfQuestions: isSubject?.countNoOfQuestions,
      }

      return res
        .status(200)
        .json({ success: true, totalSubjectCount: data.totalSubjectCount, totalSubjects: data.totalSubjects, countNoOfQuestions: data.countNoOfQuestions });
    }
    else {
      const allSubject = await QuestionsModel.find({})
        .sort({ _id: -1 })
        .select("questionCategory");
      let temp = await allSubject.map((e) => {
        return e.questionCategory;
      });
      const subjects = new Set(temp);
      const totalSubjects = [];
      const countNoOfQuestions = [];
      for (let el of subjects) totalSubjects.push(el);
      const totalSubjectCount = totalSubjects.length;

      for (let sub in totalSubjects)
        countNoOfQuestions.push(await QuestionsModel.find({ questionCategory: totalSubjects[sub] }).countDocuments());

      const data = {
        totalSubjectCount, totalSubjects, countNoOfQuestions,
      }

      myCache.set("allSubjects", data);

      return res
        .status(200)
        .json({ success: true, totalSubjectCount, totalSubjects, countNoOfQuestions });
    }
  } else {
    const isSubject = await myCache.get(String(_subject)?.toLowerCase());
    if (isSubject) {
      return res.status(200).json({ success: true, totalQuestions: isSubject?.length, allQuestions: isSubject });
    } else {
      const allQuestions = await QuestionsModel.find({ questionCategory: { $regex: new RegExp(_subject, 'i') } }).sort({ _id: -1 });
      myCache.set(String(_subject)?.toLowerCase(), allQuestions);
      return res.status(200).json({ success: true, totalQuestions: allQuestions.length, allQuestions });
    }
  }

});

//  //! ------------ Get all Questions ------------
exports.getAllQuestions = catchAsyncError(async (req, res, next) => {
  const searchFeature = new SearchFeature(
    QuestionsModel.find().sort({ _id: -1 }),
    req.query
  ).filterByQuestionType();
  const questions = await searchFeature.query;

  //  Count documents by iteration...
  let questionsCount = 0;
  for (let i = 0; i < questions.length; i++) questionsCount++;
  return res.status(200).json({ success: true, questionsCount, questions });
});

//  //! ------------ Get a Question by id ------------
exports.getAquestion = catchAsyncError(async (req, res, next) => {
  const questions = await QuestionsModel.findById(req.params.id);
  if (!questions) {
    return next(
      new ErrorHandler(404, `Invalid Id: ${req.params.id}, Question not found`)
    );
  }
  return res.status(200).json({ success: true, questions });
});

//  //! ------------ Update a Question ------------
exports.updateQuestion = catchAsyncError(async (req, res, next) => {
  let questions = QuestionsModel.findById(req.params.id);
  if (!questions) {
    return next(
      new ErrorHandler(404, `Invalid Id: ${req.params.id}, Question not found`)
    );
  }

  myCache.flushAll();

  questions = await QuestionsModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({ success: true, questions });
});

//  //! ------------ Delete a Question ------------
exports.deleteQuestion = catchAsyncError(async (req, res, next) => {
  let question = await QuestionsModel.findById(req.params.id);
  if (!question) {
    return next(
      new ErrorHandler(404, `Invalid Id: ${req.params.id}, Question not found`)
    );
  }
  await QuestionsModel.findByIdAndDelete(req.params.id);

  myCache.flushAll();

  return res
    .status(200)
    .json({ success: true, msg: "Question Removed Successfully." });
});
