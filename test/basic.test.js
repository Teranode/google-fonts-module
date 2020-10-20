const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('basic', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = (await setup(loadConfig(__dirname, 'basic'))))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const url = 'https://fonts.googleapis.com/css2?family=Roboto&family=Lato'
    const html = await get('/')
    expect(html).toContain('<link data-hid="gf-prefetch" rel="dns-prefetch" href="https://fonts.gstatic.com/">')
    expect(html).toContain('<link data-hid="gf-preconnect" rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="true">')
    expect(html).toContain(`<link data-hid="gf-preload" rel="preload" as="style" href="${url}">`)
    expect(html).toContain(`<link data-hid="gf-stylesheet" rel="stylesheet" href="${url}" media="print" onload="this.onload=null;this.removeAttribute('media');`)
    expect(html).toContain(`<noscript data-hid="gf-noscript"><link rel="stylesheet" href="${url}"></noscript>`)
  })
})
