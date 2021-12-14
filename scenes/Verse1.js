import { Easing, Layer, Origin, OsbColor, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import imageSize from 'image-size'
import { join } from 'path'
import { beat, path } from '../osbjs.config.js'
import { txtgen } from '../lib/txtgen.js'
import { Color } from '../lib/pallete.js'
import { degToRad } from '@osbjs/math'

export class Verse1 extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.#_startSceneTransition()
		this.#_bg()
		this.#_line1()
		this.#_line2()
		this.#_line3()
		this.#_line4()
		this.#_endSceneTransition()
	}

	#_line1() {
		const startTime = 22480,
			endTime = 26855
		const imgSize = imageSize(join(path, 'sb/juky/1.jpg'))
		const imgHeight = imgSize.height
		const imgY = 120,
			imgX = 280
		const imgScaleRatio = 280 / imgHeight

		const img = new Sprite('sb/juky/1.jpg', Layer.Background, Origin.TopRight)
		img.Fade(startTime, endTime, 1, 1)
		img.ScaleAtTime(startTime, imgScaleRatio)
		img.MoveXAtTime(startTime, imgX)
		img.MoveY(startTime, startTime + beat, imgY + 385, imgY, Easing.OutCirc)
		img.MoveY(startTime + beat, endTime - beat, imgY, imgY - 15)
		img.MoveY(endTime - beat, endTime, imgY - 15, imgY - 15 - 385, Easing.InCirc)

		const borderOffset = 4
		const frameY = imgY - borderOffset,
			frameX = imgX + borderOffset
		const frame = new Sprite('sb/px.png', Layer.Background, Origin.TopRight)
		frame.ScaleAtTime(startTime, 280 + borderOffset * 2)
		frame.Fade(startTime, endTime, 1, 1)
		frame.MoveXAtTime(startTime, frameX)
		frame.MoveY(startTime, startTime + beat, frameY + 385, frameY, Easing.OutCirc)
		frame.MoveY(startTime + beat, endTime - beat, frameY, frameY - 15)
		frame.MoveY(endTime - beat, endTime, frameY - 15, frameY - 15 - 385, Easing.InCirc)
		frame.ColorAtTime(startTime, Color.BabyBlueEyes)

		this.registerComponents(frame, img)

		const lyrics = [
			{
				text: 'Cuộc đời em vốn,',
				time: 22481,
			},
			{
				text: 'chỉ là đường thẳng mà thôi',
				time: 24042,
			},
		]

		let lineY = 120
		const lineX = 340

		lyrics.forEach((line) => {
			const texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
			sprite.MoveXAtTime(startTime, lineX)
			sprite.MoveY(startTime, startTime + beat, lineY + 385, lineY, Easing.OutCirc)
			sprite.MoveY(startTime + beat, endTime - beat, lineY, lineY - 15)
			sprite.MoveY(endTime - beat, endTime, lineY - 15, lineY - 15 - 385, Easing.InCirc)
			sprite.ColorAtTime(startTime, Color.Amethyst)
			sprite.ScaleAtTime(startTime, 0.6)
			sprite.FadeAtTime(startTime, 0)
			sprite.Fade(line.time, line.time + beat / 2, 0, 1)
			sprite.FadeAtTime(endTime, 0)

			this.registerComponents(sprite)

			lineY += texture.height * 0.6
		})
	}

	#_line2() {
		const startTime = 26855,
			endTime = 31855

		const imgHeight = imageSize(join(path, 'sb/juky/2.jpg')).height
		const img = new Sprite('sb/juky/2.jpg', Layer.Background, Origin.TopLeft)
		const imgY = 120,
			imgX = 340
		img.Fade(startTime, endTime, 1, 1)
		img.ScaleAtTime(startTime, 280 / imgHeight)
		img.MoveXAtTime(startTime, imgX)
		img.MoveY(startTime, startTime + beat, imgY + 385, imgY, Easing.OutCirc)
		img.MoveY(startTime + beat, endTime - beat, imgY, imgY - 15)
		img.MoveY(endTime - beat, endTime, imgY - 15, imgY - 15 - 385, Easing.InCirc)

		const borderOffset = 4
		const frameY = imgY - borderOffset,
			frameX = imgX - borderOffset
		const frame = new Sprite('sb/px.png', Layer.Background, Origin.TopLeft)
		frame.ScaleAtTime(startTime, 280 + borderOffset * 2)
		frame.Fade(startTime, endTime, 1, 1)
		frame.MoveXAtTime(startTime, frameX)
		frame.MoveY(startTime, startTime + beat, frameY + 385, frameY, Easing.OutCirc)
		frame.MoveY(startTime + beat, endTime - beat, frameY, frameY - 15)
		frame.MoveY(endTime - beat, endTime, frameY - 15, frameY - 15 - 385, Easing.InCirc)
		frame.ColorAtTime(startTime, Color.BabyBlueEyes)

		this.registerComponents(frame, img)

		const lyrics = [
			{
				text: 'Mà sao tình cờ gặp anh,',
				time: 27481,
			},
			{
				text: 'em rẽ ngang qua đời',
				time: 29355,
			},
		]

		let lineY = 120
		const lineX = 280
		lyrics.forEach((line) => {
			const texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopRight)
			sprite.MoveXAtTime(startTime, lineX)
			sprite.MoveY(startTime, startTime + beat, lineY + 385, lineY, Easing.OutCirc)
			sprite.MoveY(startTime + beat, endTime - beat, lineY, lineY - 15)
			sprite.MoveY(endTime - beat, endTime, lineY - 15, lineY - 15 - 385, Easing.InCirc)
			sprite.ColorAtTime(startTime, Color.Amethyst)
			sprite.ScaleAtTime(startTime, 0.6)
			sprite.FadeAtTime(startTime, 0)
			sprite.Fade(line.time, line.time + beat / 2, 0, 1)
			sprite.FadeAtTime(endTime, 0)

			this.registerComponents(sprite)

			lineY += texture.height * 0.6
		})
	}

	#_line3() {
		const startTime = 31855,
			endTime = 36855
		const imgSize = imageSize(join(path, 'sb/juky/3.jpg'))
		const imgHeight = imgSize.height
		const imgY = 120,
			imgX = 280
		const imgScaleRatio = 280 / imgHeight

		const img = new Sprite('sb/juky/3.jpg', Layer.Background, Origin.TopRight)
		img.Fade(startTime, endTime, 1, 1)
		img.ScaleAtTime(startTime, imgScaleRatio)
		img.MoveXAtTime(startTime, imgX)
		img.MoveY(startTime, startTime + beat, imgY + 385, imgY, Easing.OutCirc)
		img.MoveY(startTime + beat, endTime - beat, imgY, imgY - 15)
		img.MoveY(endTime - beat, endTime, imgY - 15, imgY - 15 - 385, Easing.InCirc)

		const borderOffset = 4
		const frameY = imgY - borderOffset,
			frameX = imgX + borderOffset
		const frame = new Sprite('sb/px.png', Layer.Background, Origin.TopRight)
		frame.ScaleAtTime(startTime, 280 + borderOffset * 2)
		frame.Fade(startTime, endTime, 1, 1)
		frame.MoveXAtTime(startTime, frameX)
		frame.MoveY(startTime, startTime + beat, frameY + 385, frameY, Easing.OutCirc)
		frame.MoveY(startTime + beat, endTime - beat, frameY, frameY - 15)
		frame.MoveY(endTime - beat, endTime, frameY - 15, frameY - 15 - 385, Easing.InCirc)
		frame.ColorAtTime(startTime, Color.BabyBlueEyes)

		this.registerComponents(frame, img)

		const lyrics = [
			{
				text: 'Vài người vội vã,',
				time: 32481,
			},
			{
				text: 'vội đến rồi đi',
				time: 34355,
			},
		]

		let lineY = 120
		const lineX = 340

		lyrics.forEach((line) => {
			const texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
			sprite.MoveXAtTime(startTime, lineX)
			sprite.MoveY(startTime, startTime + beat, lineY + 385, lineY, Easing.OutCirc)
			sprite.MoveY(startTime + beat, endTime - beat, lineY, lineY - 15)
			sprite.MoveY(endTime - beat, endTime, lineY - 15, lineY - 15 - 385, Easing.InCirc)
			sprite.ColorAtTime(startTime, Color.Amethyst)
			sprite.ScaleAtTime(startTime, 0.6)
			sprite.FadeAtTime(startTime, 0)
			sprite.Fade(line.time, line.time + beat / 2, 0, 1)
			sprite.FadeAtTime(endTime, 0)

			this.registerComponents(sprite)

			lineY += texture.height * 0.6
		})
	}

	#_line4() {
		const startTime = 36855,
			endTime = 41855

		const imgHeight = imageSize(join(path, 'sb/juky/4.jpg')).height
		const img = new Sprite('sb/juky/4.jpg', Layer.Background, Origin.TopLeft)
		const imgY = 120,
			imgX = 340

		img.Fade(startTime, endTime - beat, 1, 1)
		img.Fade(endTime - beat, endTime, 1, 0)
		img.ScaleAtTime(startTime, 280 / imgHeight)
		img.MoveXAtTime(startTime, imgX)
		img.MoveY(startTime, startTime + beat, imgY + 385, imgY, Easing.OutCirc)
		img.MoveY(startTime + beat, endTime - beat, imgY, imgY - 15)

		const borderOffset = 4
		const frameY = imgY - borderOffset,
			frameX = imgX - borderOffset
		const frame = new Sprite('sb/px.png', Layer.Background, Origin.TopLeft)
		frame.ScaleAtTime(startTime, 280 + borderOffset * 2)
		frame.Fade(startTime, endTime - beat, 1, 1)
		frame.Fade(endTime - beat, endTime, 1, 0)
		frame.MoveXAtTime(startTime, frameX)
		frame.MoveY(startTime, startTime + beat, frameY + 385, frameY, Easing.OutCirc)
		frame.MoveY(startTime + beat, endTime - beat, frameY, frameY - 15)
		frame.ColorAtTime(startTime, Color.BabyBlueEyes)

		this.registerComponents(frame, img)

		const lyrics = [
			{
				text: 'Mà sao em yêu anh',
				time: 37481,
			},
			{
				text: 'đâu cần nghĩ suy',
				time: 39042,
			},
		]

		let lineY = 120
		const lineX = 280
		lyrics.forEach((line) => {
			const texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopRight)
			sprite.MoveXAtTime(startTime, lineX)
			sprite.MoveY(startTime, startTime + beat, lineY + 385, lineY, Easing.OutCirc)
			sprite.MoveY(startTime + beat, endTime - beat, lineY, lineY - 15)
			sprite.Fade(endTime - beat, endTime, 1, 0)
			sprite.ColorAtTime(startTime, Color.Amethyst)
			sprite.ScaleAtTime(startTime, 0.6)
			sprite.FadeAtTime(startTime, 0)
			sprite.Fade(line.time, line.time + beat / 2, 0, 1)
			sprite.FadeAtTime(endTime, 0)

			this.registerComponents(sprite)

			lineY += texture.height * 0.6
		})
	}

	#_bg() {
		const startTime = 22480,
			endTime = 42480

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.FadeAtTime(endTime, 0)
		bg.ColorAtTime(startTime, Color.TeaGreen)

		this.registerComponents(bg)
	}

	#_startSceneTransition() {
		const startTime = 21855

		const leftSprite = new Sprite('sb/px.png', Layer.Background, Origin.CenterLeft)
		leftSprite.ColorAtTime(startTime, Color.TeaGreen)
		leftSprite.ScaleVec(startTime, startTime + beat, new OsbVector2(1, 480), new OsbVector2(854 / 2, 480), Easing.OutCirc)

		const rightSprite = new Sprite('sb/px.png', Layer.Background, Origin.CenterRight)
		rightSprite.ColorAtTime(startTime, Color.TeaGreen)
		rightSprite.ScaleVec(startTime, startTime + beat, new OsbVector2(1, 480), new OsbVector2(854 / 2, 480), Easing.OutCirc)

		this.registerComponents(leftSprite, rightSprite)
	}

	#_endSceneTransition() {
		const angle = 30,
			thickness = 30,
			color = Color.LightPink

		const startTime = 41855

		let actualLength = 854 + 480 * Math.tan(degToRad(Math.abs(angle)))
		let spriteLength = Math.sqrt(Math.pow(854, 2) + Math.pow(480, 2)) + thickness * Math.tan(degToRad(Math.abs(angle)))

		let openOrigin = Origin.TopLeft
		let openX = -107
		let openY = 0 - thickness * Math.sin(degToRad(angle))

		for (let i = 0; i <= actualLength / (thickness / Math.cos(degToRad(angle))); i++) {
			const openSprite = new Sprite('sb/px.png', Layer.Background, openOrigin, new OsbVector2(openX, openY))
			openSprite.ColorAtTime(startTime, color)
			openSprite.RotateAtTime(startTime, degToRad(angle))
			openSprite.ScaleVec(startTime, startTime + beat, new OsbVector2(0, spriteLength), new OsbVector2(thickness, spriteLength), Easing.OutExpo)
			openSprite.FadeAtTime(startTime, 1)
			openSprite.FadeAtTime(startTime + beat, 0)

			openX += thickness / Math.cos(degToRad(angle))

			this.registerComponents(openSprite)
		}
	}
}
