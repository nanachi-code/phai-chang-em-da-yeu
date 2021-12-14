import { degToRad, randFloat, randInt } from '@osbjs/math'
import { Scene, Layer, Sprite, OsbVector2, Origin, Easing, OsbColor } from '@osbjs/osbjs'
import { Color } from '../lib/pallete.js'
import { beat, path } from '../osbjs.config.js'
import imageSize from 'image-size'
import { join } from 'path'
import { txtgen } from '../lib/txtgen.js'

export class Verse2 extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.#_bg()
		this.#_bubbles()
		this.#_lyrics()
		this.#_startSceneTransition()
		this.#_endSceneTransition()
	}

	#_lyrics() {
		const lyrics = [
			{
				end: 46855,
				line1: {
					time: 42480,
					text: 'Từng đêm nhớ mong về người',
				},
				line2: {
					time: 44042,
					text: 'Biết anh còn chờ đợi',
				},
			},
			{
				end: 51230,
				line1: {
					time: 47480,
					text: 'Chơi vơi bao đêm',
				},
				line2: {
					time: 49042,
					text: 'em thấy đủ rồi',
				},
			},
			{
				end: 56855,
				line1: {
					time: 51855,
					text: 'Ngàn tia nắng anh gần lại',
				},
				line2: {
					time: 54042,
					text: 'Ánh dương màu mắt xanh ngời',
				},
			},
			{
				end: 61230,
				line1: {
					time: 57480,
					text: 'Lóe lên ngàn giấc mơ còn trong đời',
				},
			},
		]

		const line1Pos = new OsbVector2(40, 60),
			line2Pos = new OsbVector2(100, 120)

		lyrics.forEach((line) => {
			const line1Texture = txtgen.generateTexture(line.line1.text, Color.White, { left: 10, right: 10 })

			const line1Sprite = new Sprite(line1Texture.osbPath, Layer.Background, Origin.TopLeft, line1Pos)
			line1Sprite.Fade(line.line1.time, line.line1.time + beat, 0, 1)
			line1Sprite.Fade(line.end - beat, line.end, 1, 0)
			line1Sprite.ScaleAtTime(line.line1.time, 0.6)
			line1Sprite.MoveY(line.line1.time, line.end, line1Pos.y, line1Pos.y - 10)

			this.registerComponents(line1Sprite)

			if (line.line2) {
				const line2Texture = txtgen.generateTexture(line.line2.text, Color.White, { left: 10, right: 10 })

				const line2Sprite = new Sprite(line2Texture.osbPath, Layer.Background, Origin.TopLeft, line2Pos)
				line2Sprite.Fade(line.line2.time, line.line2.time + beat, 0, 1)
				line2Sprite.Fade(line.end - beat, line.end, 1, 0)
				line2Sprite.ScaleAtTime(line.line2.time, 0.6)
				line2Sprite.MoveY(line.line1.time, line.end, line2Pos.y, line2Pos.y - 10)

				this.registerComponents(line2Sprite)
			}
		})
	}

	#_bg() {
		const startTime = 42480,
			endTime = 61230

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.FadeAtTime(62480, 0)
		bg.ColorAtTime(startTime, Color.Black)
		bg.ColorAtTime(61230, Color.TeaGreen)

		this.registerComponents(bg)

		const jukyWidth = imageSize(join(path, 'sb/juky/fill.png')).width
		const juky = new Sprite('sb/juky/fill.png', Layer.Background, Origin.TopCenter)
		juky.FadeAtTime(startTime, 1)
		juky.ScaleAtTime(startTime, 200 / jukyWidth)
		juky.MoveY(startTime, endTime, 240, 210)
		juky.FadeAtTime(endTime, 0)
		juky.ColorAtTime(startTime, Color.BlanchedAlmond)

		this.registerComponents(juky)
	}

	#_bubbles() {
		const startTime = 42480,
			endTime = 61230

		// spawn every 2 beat
		let bubbleStartTime = startTime

		while (bubbleStartTime < endTime - beat * 4) {
			const startY = randInt(240, 480),
				endY = startY - 200
			const bubble = new Sprite('sb/bubble.png', Layer.Background)

			bubble.Fade(bubbleStartTime, bubbleStartTime + beat, 0, 0.4)
			bubble.Fade(bubbleStartTime + beat, bubbleStartTime + beat * 4, 0.4, 0)
			bubble.MoveXAtTime(bubbleStartTime, randInt(-107, 747))
			bubble.ScaleAtTime(bubbleStartTime, randFloat(0.1, 0.2))
			bubble.MoveY(bubbleStartTime, bubbleStartTime + (endTime - startTime), startY, endY)

			this.registerComponents(bubble)

			bubbleStartTime += beat / 2
		}
	}

	#_startSceneTransition() {
		const angle = 30,
			thickness = 30,
			color = Color.LightPink

		const startTime = 42480

		let actualLength = 854 + 480 * Math.tan(degToRad(Math.abs(angle)))
		let spriteLength = Math.sqrt(Math.pow(854, 2) + Math.pow(480, 2)) + thickness * Math.tan(degToRad(Math.abs(angle)))

		let closeOrigin = Origin.TopRight
		let closeX = -107 + thickness * Math.cos(degToRad(angle))
		let closeY = 0

		for (let i = 0; i <= actualLength / (thickness / Math.cos(degToRad(angle))); i++) {
			const closeSprite = new Sprite('sb/px.png', Layer.Background, closeOrigin, new OsbVector2(closeX, closeY))
			closeSprite.ColorAtTime(startTime, color)
			closeSprite.RotateAtTime(startTime, degToRad(angle))
			closeSprite.ScaleVec(
				startTime,
				startTime + beat,
				new OsbVector2(thickness, spriteLength),
				new OsbVector2(0, spriteLength),
				Easing.OutExpo
			)
			closeSprite.FadeAtTime(startTime, 1)
			closeSprite.FadeAtTime(startTime + beat, 0)

			closeX += thickness / Math.cos(degToRad(angle))

			this.registerComponents(closeSprite)
		}
	}

	#_endSceneTransition() {
		const startTime = 60292,
			endTime = 61230

		const barWidth = 854 / 4
		for (let i = 0; i < 4; i++) {
			const barStartTime = startTime + (beat / 4) * i
			const barPos = i % 2 == 0 ? new OsbVector2(-107 + barWidth * i, 0) : new OsbVector2(-107 + barWidth * i, 480)
			const barOrigin = i % 2 == 0 ? Origin.TopLeft : Origin.BottomLeft

			const bar = new Sprite('sb/px.png', Layer.Background, barOrigin, barPos)
			bar.ScaleVec(barStartTime, barStartTime + beat, new OsbVector2(barWidth, 0), new OsbVector2(barWidth, 480), Easing.OutExpo)
			bar.FadeAtTime(barStartTime, 1)
			bar.FadeAtTime(endTime, 0)
			bar.ColorAtTime(barStartTime, Color.TeaGreen)

			this.registerComponents(bar)
		}
	}
}
