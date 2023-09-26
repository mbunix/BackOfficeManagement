import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm-max': { max: '639px' },
      'md-lg': { min: '768px', max: '1023px' },
      md: [{ min: '668px', max: '767px' }, { min: '868px' }],
      portrait: { raw: '(orientation: portrait)' }
    },
    extend: {}
  },
  plugins: []
})
