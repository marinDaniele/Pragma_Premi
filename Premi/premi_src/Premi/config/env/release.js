'use strict';

module.exports = {
    db: 'mongodb://localhost/premi',
    app: {
        title: 'Premi',
        description: 'Presentation software that lets you create and run presentations using mindmaps',
        keywords: 'premi, mindmap, presentation, linear, non-linear presentation'
    },
    port: process.env.PORT || 3000,
    sessionSecret: 'premi-beats-prezi',
    sessionCollection: 'sessions'
};
