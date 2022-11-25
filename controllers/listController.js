const axios = require('axios');

const listController = {
    getRenderList: (req,res) =>{
        res.render('../views/lists.twig');
    },

    getListOptionData: async (req, res) => {
        console.log(1);
        try {
            console.log('----- calling options apis--------')
            let optionsData = await axios.get('https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY');
            console.log('----- call ended--------')
            const results = optionsData.data.records;
            let expireDate = results.expiryDates;
    
            let futureExpireDate = expireDate[0];
    
            let strikePriceArr = results.strikePrices;
            let minSP = Array.from(strikePriceArr.filter((item) => item <= results.underlyingValue));
            let maxSP = Array.from(strikePriceArr.filter((item) => item >= results.underlyingValue));
    
            //res.send(aclRecords.filter(bnr => bnr.strikePrice === results.underlyingValue));
            console.log('-------', new Date() ,'-----------------');
            let lastMinVal = minSP.slice(minSP.length - 10, minSP.length);
            let lastMaxVal = maxSP.slice(0, 10);
            
            
            // console.log(lastMaxVal);
            let optionData = optionsData.data.records.data;
            let finalMinVal = [];
            let finalMaxVal = [];
            
            for (let i = 0; i < lastMinVal.length; i++) {
                let minVal = {};    
                let filterData = optionData.filter((item) => item.strikePrice == lastMinVal[i] && item.expiryDate === futureExpireDate);
                minVal.strikePrice = lastMinVal[i];
                minVal.CEChangeInOpenInterest = filterData[0].CE.changeinOpenInterest;
                minVal.PEChangeInOpenInterest = filterData[0].PE.changeinOpenInterest;
                finalMinVal.push(minVal);
            }
            for (let i = 0; i < lastMaxVal.length; i++) {
                let maxVal = {};
                let filterData = optionData.filter((item) => item.strikePrice == lastMaxVal[i] && item.expiryDate === futureExpireDate);
                maxVal.strikePrice = lastMaxVal[i];
                maxVal.CEChangeInOpenInterest = filterData[0].CE.changeinOpenInterest;
                maxVal.PEChangeInOpenInterest = filterData[0].PE.changeinOpenInterest;
                finalMaxVal.push(maxVal);
            }
            res.send({ optionMin: finalMinVal, optionMax: finalMaxVal, expireDate: expireDate[0], bankNifty: results.underlyingValue  });
            //res.render('../views/list.twig', );
    
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = listController;