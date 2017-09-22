(function() {
    try {
        const namespace = 'rapid';

        window.diver.processors[namespace] = {
            name: 'Rapid',
            namespace: namespace,
            process: function process(traffic) {
                const obj = {};

                try {
                    let params;

                    traffic.request.queryString.some(({name, value}) => {
                        if (name === '_P') {
                            params = value.replace(/^.*%05/, '').split('%04');
                            return true;
                        }
                    });

                    params.forEach((param) => {
                        const index = param.indexOf('%03');
                        let kstr;
                        let vstr;

                        if (index >= 0) {
                            kstr = param.substr(0, index);
                            vstr = param.substr(index + 3);
                        } else {
                            kstr = param;
                            vstr = '';
                        }

                        obj[decodeURIComponent(kstr)] = decodeURIComponent(vstr);
                    });
                } catch (e) {
                    // fail silently
                }

                return obj;
            }
        };
    } catch (e) {
        // fail silently
    }
})();
