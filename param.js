(function() {
    try {
        var namespace = 'param';

        window.diver.processors[namespace] = {
            name: 'Param',
            namespace: namespace,
            process: function process(traffic) {
                const obj = {};

                try {
                    const startIndex = traffic.request.url.indexOf(';');
                    let params;

                    if (startIndex === -1) {
                        return obj;
                    }

                    traffic.request.url.substr(startIndex + 1).split(';').forEach((param) => {
                        const index = param.indexOf('=');
                        let kstr, vstr, k, v;

                        if (index >= 0) {
                            kstr = param.substr(0, index);
                            vstr = param.substr(index + 1);
                        } else {
                            kstr = param;
                            vstr = '';
                        }

                        k = decodeURIComponent(kstr);
                        v = decodeURIComponent(vstr);

                        if (!obj.hasOwnProperty(k)) {
                            obj[k] = v;
                        } else if (Array.isArray(obj[k])) {
                            obj[k].push(v);
                        } else {
                            obj[k] = [obj[k], v];
                        }
                    });
                } catch (e) {}

                return obj;
            }
        };
    } catch (e) {}
})();
