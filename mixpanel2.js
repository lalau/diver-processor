function getProcessor() {
    return {
        name: 'Mixpanel',
        namespace: 'mixpanel',
        process: function process(traffic) {
            var params;
            var obj;

            traffic.request.queryString.some(({name, value}) => {
                if (name === 'data') {
                    params = decodeURIComponent(value);
                    return true;
                }
            });

            if (!params) {
                return {};
            }

            try {
                obj = JSON.parse(atob(params));
            } catch (e) {
                obj = {};
            }

            obj.properties.event = obj.event;

            return obj.properties;
        }
    };
}
