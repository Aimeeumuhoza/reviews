import CracoAntDesignPlugin from 'craco-antd'

export const plugins = [
  {
    plugin: CracoAntDesignPlugin,
    options: {
      customizeTheme: {
        '@primary-color': '#000000',
        '@link-color': '#333333',
        'font-family': "'Montserrat', 'sans-serif'",
      },
    },
  },
]
