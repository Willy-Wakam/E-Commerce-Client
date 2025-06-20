export const registerControls = [
    {
        name: 'username',
        type: 'text',
        componetType: 'input',
        label: 'Username',
        placeholder: 'Enter your username',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 20
        }
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email address',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true,
        validation: {
            minLength: 6
        }
    },
    {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Re-enter your password',
        required: true,
        validation: {
            matchesField: 'password'
        }
    }
]

export const loginControls = [
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email address',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true,
        validation: {
            minLength: 6
        }
    },
]