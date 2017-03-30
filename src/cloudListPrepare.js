
function cloudListPrepare (topics) {

    topics.map(function(item){
        var paddingLeft = parseInt((Math.random() * 40), 10);
        var styleSetting = {'marginLeft': paddingLeft + 'px'};

        item.styleSetting = styleSetting;
    })


    topics.forEach(function(item){
      if(item.volume > maxValue) {
            maxValue = item.volume;
        }
    })

    console.log(maxValue);
    

    function findSizeSettings (topics, num, balanced) {

        /// help from http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
        var numberOfBuckets = numberOfBuckets || 6;
        var chunks = topics.length / (numberOfBuckets/2);
        console.log('chunks', chunks);
        topics.split
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
        }

        else if (balanced) {
            while (i < len) {
                size = Math.ceil((len - i) / num--);
                out.push(topics.slice(i, i += size));
            }
        }

        else {
            num--;
            size = Math.floor(len / num);
            if (len % size === 0)
                size--;
            while (i < size * n) {
                out.push(topics.slice(i, i += size));
            }
            out.push(topics.slice(size * n));

        }
        console.log(out, 'array magic');
        out.forEach(function(arr, i){
            
            console.log(arr, 'arr');
            var interval = arr.length / 2;
            var maxValue = 0;
            var minValue = 1000;
                arr.forEach(function(item) {

                    if(item.volume > maxValue) {
                        maxValue = item.volume;
                    }
                    if (item.volume < minValue) {
                        minValue = item.volume;
                    } 

                })
        console.log(minValue, maxValue, 'ranges');
        var midPoint =  minValue +  parseInt( ((maxValue - minValue)/2), 10) ;
        console.log(midPoint, 'midPoint')

                arr.forEach(function(item, j) {
                    if (item.volume > midPoint) {
                        item.myTextSizeClass = 'size-' + (1 + j + i);
                    } else {
                        item.myTextSizeClass = 'size-' + (1 + j + i);
                    }
                    console.log('size here?', item)

                })

            /*
            for (i = 1; i < 2; i++) {
            if (val <= i*interval) {
                tpp
                return 'size-' + i;
            }
            */
        });


    
        

        return out;
    }
    var arraySets = findSizeSettings(topics, 3, false);


    /// set size buckets for font-size classes 
    function findBuckets(val, maxValue, numberOfBuckets) {
        
        var numberOfBuckets = numberOfBuckets || 6;
        var interval = maxValue/numberOfBuckets;
        var i;
        for (i = 1; i < (numberOfBuckets + 1); i++) {
          //  console.log(i*interval)
            if (val <= i*interval) {
          //     console.log(val, 'whater', 'size-' + i);
                return 'size-' + i;
            }
        }
    }






} 
   