import { Layer, Origin, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import { Color } from '../lib/pallete.js'
import { txtgen } from '../lib/txtgen.js'
import { beat } from '../osbjs.config.js'

export class Outro extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.#_bg()
		this.#_closingCredits()
		this.#_startSceneTransition()
	}

	#_closingCredits() {
		const startTime = 182480
		const credits = [
			'Singer: Juky San',
			'Music Composer: RedT',
			'Storyboard: Nanachi',
			//    'Map: who maps'
		]

		// measure
		let height = 0
		credits.forEach((line) => {
			const texture = txtgen.generateTexture(line, Color.White, { left: 10, right: 10 })

			height += texture.height * 0.5
		})

		let startY = 240 - height / 2

		credits.forEach((line) => {
			const texture = txtgen.generateTexture(line, Color.White, { left: 10, right: 10 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopCenter)
			sprite.FadeAtTime(startTime, 1)
			sprite.ScaleAtTime(startTime, 0.5)
			sprite.MoveYAtTime(startTime, startY)
			sprite.Fade(startTime + beat * 3, startTime + beat * 4, 1, 0)

			this.registerComponents(sprite)

			startY += texture.height * 0.5
		})
	}

	#_startSceneTransition() {
		const startTime = 182480

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.Fade(startTime, startTime + beat, 1, 0)

		this.registerComponents(bg)
	}

	#_bg() {
		const startTime = 182480,
			endTime = 184980

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.Fade(endTime - beat, endTime, 1, 0)
		bg.ColorAtTime(startTime, Color.Black)

		this.registerComponents(bg)
	}
}
