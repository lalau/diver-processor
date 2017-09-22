(function() {
    try {
        var namespace = 'query';

        function parseQuery(qs) {
            var obj = {};

            if (typeof qs !== 'string' || qs.length === 0) {
                return obj;
            }

            var regexp = /\+/g;
            qs = qs.split('&');

            var len = qs.length;
            var x, idx, kstr, vstr, k, v;

            for (var i = 0; i < len; i++) {
                x = qs[i].replace(regexp, '%20');
                idx = x.indexOf('=');

                if (idx >= 0) {
                    kstr = x.substr(0, idx);
                    vstr = x.substr(idx + 1);
                } else {
                    kstr = x;
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
            }

            return obj;
        }

        window.diver.processors[namespace] = {
            name: 'Query',
            namespace: namespace,
            process: function process(traffic) {
                try {
                    var url = new URL(traffic.request.url);
                    var query = url.search.substr(1);

                    return parseQuery(query);
                } catch (e) {
                    return {};
                }
            }
        };
    } catch (e) {}
})();
