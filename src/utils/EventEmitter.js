const topics = {};
var subUid = -1;

/**
 * Classic implementation of pop/sub pattern,
 * doesn't pass an event object to callback as first argument
 */
export default class EventEmitter {
    emit (topic, args) {

        if (!topics[topic]) {
            return false;
        }

        var subscribers = topics[topic];
        var len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(args);
        }

        return this;
    }

    on (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    }

    off (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    }
};
