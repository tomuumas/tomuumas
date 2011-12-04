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
            },
            defaultOption = {
                interval: 5
            },
            optionSet = [], queue = [], execute = true;
            
            function _setOption(option) {
                if (typeof(option) === 'undefined') {
                    option = defaultOption;
                } else {
                    for (prop in defaultOption) {
                        if (!option.hasOwnProperty(prop)) {
                            option[prop] = defaultOption[prop];
                        }
                    }
                }
                optionSet.push(option);
            }
            
            function down(option) {
                _setOption(option);
                queue.push(_down);
                return this;
            }
            
            function _down(option) {
                execute = false;
                var top, counter = count(option.interval);
                var id = setInterval(function() {
                    top = getStyle().top === 'auto' ? 0 : getStyle().top;
                    target.style.top = (parseInt(top) + option.interval) + 'px';
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
                var right, counter = count(option.interval);
                var id = setInterval(function() {
                    left = getStyle().left === 'auto' ? 0 : getStyle().left;
                    target.style.left = (parseInt(left) + option.interval) + 'px';
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
            
            function count(interval) {
                var count = 0;
                return function() {
                    count += interval;
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