var cloudListPrepare = function(topics) {

    /// sort array by volume value
    function sortNumber(a,b) {
        return b.volume - a.volume;
    }

    topics.sort(sortNumber);

    ///test length
    var testLength = topics.length;
    //console.log('topics length is '+ testLength) 

    // find max value for volume to set range 
    var maxValue = 0;
    topics.forEach(function(item){
      if(item.volume > maxValue) {
            maxValue = item.volume;
        }
    })

    /// splits array into three chunks   
    /// help from http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
    function findSizeSettings (topics, num) {
        var numberOfBuckets = num || 6;
        var chunks = topics.length / (numberOfBuckets/2);
        // console.log('chunks', chunks);
        topics.split;
    
        if (num < 2)
            return [topics];

        var len = topics.length,
                out = [],
                i = 0,
                size;

        if (len % num === 0) {
            size = Math.floor(len / num);
            while (i < len) {
                out.push(topics.slice(i, i += size));
            }
        } else {
            num--;
            size = Math.floor(len / num);
            if (len % size === 0)
                size--;
            while (i < size * n) {
                out.push(topics.slice(i, i += size));
            }
            out.push(topics.slice(size * n));

        }
       
        // setting var to keep count for setting size class var
        var j = 1

        out.forEach(function(arr, i){
            var interval = arr.length / 2;
            var maxValue = 0;
            var minValue = 100000;
            
            arr.forEach(function(item) {
                if(item.volume > maxValue) {
                    maxValue = item.volume;
                }
                if (item.volume < minValue) {
                    minValue = item.volume;
                }
            })

            //  console.log(minValue, maxValue, 'ranges');
            var midPoint =  minValue +  parseInt( ((maxValue - minValue)/2), 10) ;
  
            arr.forEach(function(item) {    
                if (item.volume > midPoint) {
                    item.myTextSizeClass = 'size-' + (j + i);
                } else {
                    item.myTextSizeClass = 'size-' + ((j) + (i + 1));
                }
                // console.log('checking i here', i, 'checking j here', j, 'item vol is ', item.volume, item.myTextSizeClass)
            })
            j++;
        });  
        //// finish test
        return out;
    }

    var arraySets = findSizeSettings(topics, 3, false);

    // style for cloud placement - randomize horizontalplacements
    topics.map(function(item){
        var paddingLeft = 8 + parseInt((Math.random() * 50), 10);
        var verticalAlign = (Math.random() > .5) ? 'top' : 'bottom';
        var styleSetting = {'marginLeft': paddingLeft + 'px', 'verticalAlign': verticalAlign };
        item.styleSetting = styleSetting;
    });

    /// TEST TO CHECK ARRAY still has all items
    // console.log('checking length at end of processing. currentlength is ',topics.length, 'compared to original value ', testLength)
    
    // sorting array to put largest render size in middle to create a 'somewhat' cloud-like effect
    var newArray = [];
    topics.forEach(function(item, i) {
        if ((i % 2) === 0) {
            newArray.push(item)
        } else {
            newArray.unshift(item)
        }
    })

    return newArray
} 
   
module.exports = cloudListPrepare;