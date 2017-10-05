(function() {
    try {
        var namespace = 'dummy';

        window.diver.processors[namespace] = {
            name: 'Dummy',
            namespace: namespace,
            process: function process(traffic) {
                return {
                    time: traffic.time,
                    connection: traffic.connection
                }
            }
        };
    } catch (e) {}
})();
