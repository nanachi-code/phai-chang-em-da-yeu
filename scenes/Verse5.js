import { Easing, Layer, Origin, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import imageSize from 'image-size'
import { beat, path } from '../osbjs.config.js'
import { join } from 'path'
import { degToRad, randFloat, randInt } from '@osbjs/math'
import { Color } from '../lib/pallete.js'
import { txtgen } from '../lib/txtgen.js'

export class Verse5 extends Scene {
	constructor() {
		super()
	}
	generate() {
		this.#_bg()
		this.#_lyrics()
		this.#_startSceneTransition()
		this.#_endSceneTransition()
	}

	#_lyrics() {
		const lyrics = [
			{
				end: 146855,
				line1: {
					time: 142480,
					text: 'Yêu hay không yêu',
					pos: new OsbVector2(40, 290),
				},
				line2: {
					time: 144355,
					text: 'Thương em anh hãy nói',
					pos: new OsbVector2(100, 350),
				},
			},
			{
				end: 151855,
				line1: {
					time: 147480,
					text: 'Trao nhau đôi môi',
					pos: new OsbVector2(40, 290),
				},
				line2: {
					time: 149355,
					text: 'Rồi sẽ trở thành đôi',
					pos: new OsbVector2(100, 350),
				},
			},
			{
				end: 156855,
				line1: {
					time: 152480,
					text: 'Em đang chơi vơi',
					pos: new OsbVector2(40, 60),
				},
				line2: {
					time: 154355,
					text: 'Liệu anh có bước tới',
					pos: new OsbVector2(100, 120),
				},
			},
			{
				end: 161230,
				line1: {
					time: 157167,
					text: 'Chầm chậm nói đôi lời, khiến em chợt vui cười',
					pos: new OsbVector2(40, 60),
				},
			},
		]
		lyrics.forEach((line) => {
			const line1Texture = txtgen.generateTexture(line.line1.text, Color.White, { left: 10, right: 10 })

			const line1Sprite = new Sprite(line1Texture.osbPath, Layer.Background, Origin.TopLeft, line.line1.pos)
			line1Sprite.Fade(line.line1.time, line.line1.time + beat, 0, 1)
			line1Sprite.Fade(line.end - beat, line.end, 1, 0)
			line1Sprite.ScaleAtTime(line.line1.time, 0.6)
			line1Sprite.MoveY(line.line1.time, line.end, line.line1.pos.y, line.line1.pos.y - 10)

			this.registerComponents(line1Sprite)

			if (line.line2) {
				const line2Texture = txtgen.generateTexture(line.line2.text, Color.White, { left: 10, right: 10 })

				const line2Sprite = new Sprite(line2Texture.osbPath, Layer.Background, Origin.TopLeft, line.line2.pos)
				line2Sprite.Fade(line.line2.time, line.line2.time + beat, 0, 1)
				line2Sprite.Fade(line.end - beat, line.end, 1, 0)
				line2Sprite.ScaleAtTime(line.line2.time, 0.6)
				line2Sprite.MoveY(line.line1.time, line.end, line.line2.pos.y, line.line2.pos.y - 10)

				this.registerComponents(line2Sprite)
			}
		})
	}

	#_startSceneTransition() {
		const startTime = 142480

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.Fade(startTime, startTime + beat, 1, 0)

		this.registerComponents(bg)
	}

	#_bg() {
		const time1 = 142480,
			time2 = 151855,
			time3 = 161230

		const juky1 = new Sprite('sb/juky/4.jpg', Layer.Background, Origin.TopLeft, new OsbVector2(-107, 0))
		const juky1W = imageSize(join(path, 'sb/juky/4.jpg')).width

		juky1.FadeAtTime(time1, 1)
		juky1.FadeAtTime(time2, 0)
		juky1.ScaleAtTime(time1, 900 / juky1W)
		juky1.MoveX(time1, time2, -140, -120)

		const juky2 = new Sprite('sb/juky/2.jpg', Layer.Background, Origin.TopLeft, new OsbVector2(-107, 200))
		const juky2W = imageSize(join(path, 'sb/juky/2.jpg')).width

		juky2.FadeAtTime(time2, 1)
		juky2.FadeAtTime(time3, 0)
		juky2.ScaleAtTime(time2, 900 / juky2W)
		juky2.MoveX(time2, time3, -120, -140)

		this.registerComponents(juky1, juky2)

		const topCover = new Sprite('sb/px.png', Layer.Background, Origin.TopCenter)
		topCover.FadeAtTime(time1, 1)
		topCover.FadeAtTime(time3, 0)
		topCover.RotateAtTime(time1, degToRad(-5))
		topCover.RotateAtTime(time2, degToRad(5))
		topCover.ScaleVecAtTime(time1, new OsbVector2(1000, 100))
		topCover.ColorAtTime(time1, Color.Black)
		topCover.MoveYAtTime(time1, -50)
		topCover.ScaleVec(time2 - beat, time2, new OsbVector2(1000, 100), new OsbVector2(1000, 200), Easing.InExpo)
		topCover.ScaleVec(time2, time2 + beat, new OsbVector2(1000, 500), new OsbVector2(1000, 300), Easing.OutExpo)

		const bottomCover = new Sprite('sb/px.png', Layer.Background, Origin.BottomCenter)
		bottomCover.FadeAtTime(time1, 1)
		bottomCover.FadeAtTime(time3, 0)
		bottomCover.ScaleVecAtTime(time1, new OsbVector2(1000, 320))
		bottomCover.RotateAtTime(time1, degToRad(-5))
		bottomCover.RotateAtTime(time2, degToRad(5))
		bottomCover.ColorAtTime(time1, Color.Black)
		bottomCover.MoveYAtTime(time1, 520)
		bottomCover.ScaleVec(time2 - beat, time2, new OsbVector2(1000, 320), new OsbVector2(1000, 400), Easing.InExpo)
		bottomCover.ScaleVec(time2, time2 + beat, new OsbVector2(1000, 300), new OsbVector2(1000, 100), Easing.OutExpo)

		this.registerComponents(topCover, bottomCover)
	}

	#_endSceneTransition() {
		const startTime = 160605,
			endTime = 162480

		const top = new Sprite('sb/px.png', Layer.Background, Origin.BottomCenter)
		top.FadeAtTime(startTime, 1)
		top.FadeAtTime(endTime, 0)
		top.RotateAtTime(startTime, degToRad(-10))
		top.ScaleVecAtTime(startTime, new OsbVector2(1200, 480))
		top.ColorAtTime(startTime, Color.TeaGreen)
		top.MoveY(startTime, startTime + beat, 0, 240, Easing.OutExpo)

		const bottom = new Sprite('sb/px.png', Layer.Background, Origin.TopCenter)
		bottom.FadeAtTime(startTime, 1)
		bottom.FadeAtTime(endTime, 0)
		bottom.RotateAtTime(startTime, degToRad(-10))
		bottom.ScaleVecAtTime(startTime, new OsbVector2(1200, 480))
		bottom.ColorAtTime(startTime, Color.TeaGreen)
		bottom.MoveY(startTime, startTime + beat, 480, 240, Easing.OutExpo)

		this.registerComponents(top, bottom)
	}
}
