import { Storyboard } from '@osbjs/osbjs'
import { Vig } from './components/Vig.js'
import { path, osbFilename } from './osbjs.config.js'
import { Chorus1 } from './scenes/Chorus1.js'
import { Chorus2 } from './scenes/Chorus2.js'
import { Chorus3 } from './scenes/Chorus3.js'
import { Intro } from './scenes/Intro.js'
import { Outro } from './scenes/Outro.js'
import { Verse1 } from './scenes/Verse1.js'
import { Verse2 } from './scenes/Verse2.js'
import { Verse3 } from './scenes/Verse3.js'
import { Verse4 } from './scenes/Verse4.js'
import { Verse5 } from './scenes/Verse5.js'

let storyboard = new Storyboard(osbFilename, path)

storyboard.registerComponents(
	new Intro(),
	new Verse1(),
	new Verse2(),
	new Chorus1(),
	new Verse3(),
	new Verse4(),
	new Chorus2(),
	new Verse5(),
	new Chorus3(),
	new Outro()
)
storyboard.registerComponents(new Vig())
storyboard.generate()
