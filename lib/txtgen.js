import { TextureGenerator } from '@osbjs/txtgen'
import { path } from '../osbjs.config.js'

const txtgen = new TextureGenerator(path, 'sb/lyrics', { fontName: 'HelloSunshine', fontSize: 72 })
txtgen.registerFont('./HelloSunshine.otf', 'HelloSunshine')
txtgen.emptyDir()

const biggerTxtgen = new TextureGenerator(path, 'sb/lyrics/big', { fontName: 'HelloSunshine', fontSize: 240 })
biggerTxtgen.registerFont('./HelloSunshine.otf', 'HelloSunshine')
biggerTxtgen.emptyDir()

export { txtgen, biggerTxtgen }
