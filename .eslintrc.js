module.exports = {
    extends: 'airbnb-base',
    env: {
        jest: true
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': 'off',
        'comma-dangle': ['error', 'never'],
        'max-len': 'off',
        'object-curly-spacing': ['error', 'never'],
        'brace-style': ['error', 'stroustrup', {
            'allowSingleLine': false
        }]
    }
};
