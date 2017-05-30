let avatarObj = {
        color: ['FF69B4', 'E6E6FA', 'FFA07A', '66CDAA', 'DA70D6', 'FF6347'],
        attrList: ['eyes', 'nose', 'mouth', 'color'],
        avURL: 'https://api.adorable.io/avatars/face',
        eyes: ['eyes1', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9', 'eyes10'],
        nose: ['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'],
        mouth: ['mouth1', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9', 'mouth10', 'mouth11'],
        eyesUsed: [],
        noseUsed: [],
        mouthUsed: [],
        colorUsed: [],
        getRandom: function(array) {
            return Math.floor(Math.random() * array.length);
        },
        genAvatarURL: function() {
            let curURL = this.avURL;

            this.attrList.map(function(value) {
                let obj = avatarObj;
                let curList = obj[value];
                let itemToReturn = curList.splice(obj.getRandom(curList), 1)[0];
                obj[value + 'Used'].push(itemToReturn);
                return itemToReturn;
            }).forEach(function(mapReturn) {
                curURL += '/' + mapReturn;
            })

            return curURL;
        }
    } //from aaraon
