;
(function() {

// Prepare your images
var images = [];


// Wait for the image to load
var check = setInterval(function(){
    if(files.length==images.length) {
        clearInterval(check);

        // Set the mode
        model.setCreationMethod("Blob");

        // Add the files to the zip
        model.addFiles(files, 
            function() {
                // Initialise Method
                console.log("Initialise");
            }, function(file) {
                // OnAdd
                console.log("Added file");
            }, function(current, total) {
                // OnProgress
                console.log("%s %s", current, total);
            }, function() {
                // OnEnd
                // The zip is ready prepare download link
                // <a id="downloadLink" href="blob:url">Download Zip</a>
                model.getBlobURL(function(url) {
                    document.getElementById("downloadLink").href = url;
                    document.getElementById("downloadLink").style.display = "block";
                    document.getElementById("downloadLink").download = "filename.zip";
                });
            });

    }
}, 500);


    var canvas = new fabric.Canvas(document.createElement("canvas"));

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onloadend = (function(theFile) {
                return function(e) {
                    // console.log(e.target.result);

                    var tempImageStore = new Image();

                    tempImageStore.onload = function() {
                        var self = this;

                          var rect = new fabric.Rect({
                            fill: '#ccc',
                            originX: 'center',
                            originY: 'center',
                            height: self.height,
                            width: self.width,

                        });

                        var text = new fabric.Text(self.width + ' x ' + self.height, {
                            fontSize: (self.width > self.height) ? self.height / 5 : self.width / 5,
                            fontFamily: 'Helvetica',
                            originX: 'center',
                            originY: 'center',
                            fill: '#969696',

                        });

                        var group = new fabric.Group([rect, text], {
                            left: 0,
                            top: 0,
                            selection: false,
                            selectable: false
                        });
                        group.set({
                            width: self.width,
                            height: self.height
                        })
                        var span = document.createElement('a');
                        span.className = 'item';
                        span.innerHTML = ['<img class="thumb" src="', group.toDataURL(theFile.type),
                            '" title="', escape(theFile.name), '"/>'
                        ].join('');
                        document.getElementById('imagelist').insertBefore(span, null);
                         var a = document.createElement('a');

            span.href = group.toDataURL(theFile.type);
            var filename= theFile.name.split('/').pop();
            span.download = filename;

            console.log("Loaded file " + filename);
            images.push({name: filename, data: group.toDataURL(theFile.type) });
                    };
                    tempImageStore.src = e.target.result;
                }
            })(f);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
        console.log(images);
    }

    document.getElementById('files').addEventListener('change', handleFileSelect, false);


})();