;(function(global, doc) {
    global.domController = function(targetid) {
        var target;
        
        function _init() {
            target = doc.getElementById(targetid);
            target.style.position = "absolute";
        }
        
        function _lib() {
            var interFace = {
                down: down,
                right: right,
                fade: fade
            }, optionSet = [], queue = [], execute = true;
            
            function _setOption(option) {
                optionSet.push(option);
            }
            
            function down(option) {
                _setOption(option);
                queue.push(_down);
                return this;
            }
            
            function _down(option) {
                execute = false;
                var top, counter = count();
                var id = setInterval(function() {
                    top = getStyle().top === 'auto' ? 0 : getStyle().top;
                    target.style.top = (parseInt(top) + 5) + 'px';
                    if (counter() > option.dist) {
                        clearInterval(id);
                        execute = true;
                    }
                }, 20);
            }
            
            function right(option) {
                _setOption(option);
                queue.push(_right);
                return this;
            }
            
            function _right(option) {
                execute = false;
                var right, counter = count();
                var id = setInterval(function() {
                    left = getStyle().left === 'auto' ? 0 : getStyle().left;
                    target.style.left = (parseInt(left) + 5) + 'px';
                    if (counter() > option.dist) {
                        clearInterval(id);
                        execute = true;
                    }
                }, 20);
            }
            
            function fade(option) {
                _setOption(option);
                queue.push(_fade);
                return this;
            }
            
            function _fade(option) {
                target.style.display = 'none';
            }
            
            function getStyle() {
                return doc.currentStyle || doc.defaultView.getComputedStyle(target, '');
            }
            
            function count() {
                var count = 0;
                return function() {
                    count += 5;
                    return count;
                };
            }
            
            function _execute() {
                setInterval(function() {
                    if (+queue.length && execute) {
                        queue.shift().call(this, optionSet.shift());
                    }
                }, 20);
            }
            
            _execute();
            return interFace;
        }
        
        _init();
        return _lib();
    }
})(window, document);