const Question = require("../../model/questionSchema")

const getQuestions = async (req, res) => {

    try{
        const {type, id} = req.params
        const questions = await Question.find({$and: [{"type.is_personal": type}, {"type.id": id}]}).populate("created_by", ).populate({
            path: 'type.id',
            model: type
        })

        res.json({data: questions})

    }catch(err){
        res.json({data: err})
    }

}

module.exports = getQuestions