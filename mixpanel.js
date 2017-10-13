(function() {
    try {
        var namespace = 'mixpanel';

        window.diver.processors[namespace] = {
            name: 'Mixpanel',
            namespace: namespace,
            process: function process(traffic) {
                var params;
                var obj;

                traffic.request.queryString.some(({name, value}) => {
                    if (name === 'params') {
                        params = decodeURIComponent(value);
                    }
                });

                if (!params) {
                    return {};
                }

                try {
                    obj = JSON.parse(atob(params.replace('data=', '')));
                } catch (e) {
                    obj = {};
                }

                obj.properties.event = obj.event;

                return obj.properties;
            }
        };
    } catch (e) {}
})();
