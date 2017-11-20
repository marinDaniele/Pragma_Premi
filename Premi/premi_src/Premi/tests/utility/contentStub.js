'use strict';

module.exports.createContentStub= function ()
{
    return [
            {
                class: 'title',
                width: 1,
                height: 1,
                y: 5.8,
                x: 28,
                content: 'Nuovo nodo'
            },
            {
                class: 'text',
                width: 1,
                height: 1,
                y: 5.8,
                x: 28,
                content: 'text text text'
            },
            {
                class: 'imgUrl',
                width: 1,
                height: 1,
                y: 5.8,
                x: 28,
                content: 'http://fakeurl.com'
            }
        ];
};
