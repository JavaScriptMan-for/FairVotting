const Vote = require('../models/Vote.model')
class VoteController {
    async vote (req, res) {
        const { username, candidateId } = req.body
        try {
            const existingVote = await Vote.findOne({ username })
        if(existingVote) {
            return res.status(400).json({message: "Вы уже проголосовали"})
        }

        const newVote = new Vote({ username, candidateId })
        await newVote.save()

        res.json({message: "Вы успешно отдали свой голос"})
        } catch (error) {
            res.status(500).json({message: "Ошибка сервера"})
        }  
    }
    async getVotePercentages(req, res) {
        try {
          const totalVotes = await Vote.countDocuments();
          const results = await Vote.aggregate([
            {
              $group: {
                _id: '$candidateId',
                count: { $sum: 1 },
              },
            },
               {
               $project: {
                 candidateId: '$_id',
                  count: 1,
                  _id: 0
                 }
             }
          ]);
  
          const allIds = await Vote.distinct('candidateId');
  
        const percentageResults = allIds.reduce((acc, id) => {
           const candidateData = results.find(res => res.candidateId == id);
             const voteCount = candidateData ? candidateData.count : 0;
              const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100) : 0;
            acc[id] = parseFloat(percentage.toFixed(2));
            return acc
         }, {})
  
        res.json({ percentageResults });
      } catch (error) {
          console.error('Ошибка при получении процентов голосов', error);
        res.status(500).json({ message: 'Ошибка сервера' });
      }
    }
}
module.exports = new VoteController