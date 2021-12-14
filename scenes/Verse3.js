import { degToRad, randFloat, randInt } from '@osbjs/math'
import { Easing, Layer, Origin, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import { Color } from '../lib/pallete.js'
import { txtgen } from '../lib/txtgen.js'
import { beat } from '../osbjs.config.js'

export class Verse3 extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.#_bg()
		this.#_bubbles()
		this.#_firstHalf()
		this.#_startSceneTransition()
		this.#_midSceneTransition()
		this.#_secondHalf()
		this.#_endSceneTransition()
	}

	#_firstHalf() {
		const lyrics = [
			{
				end: 86855,
				line1: {
					time: 82480,
					text: 'Trái đất vốn lạ thường',
				},
				line2: {
					time: 84355,
					text: 'Mà sao em cứ đi nhầm đường',
				},
			},
			{
				end: 91855,
				line1: {
					time: 87167,
					text: 'Lạc vào tim anh lẻ loi',
				},
				line2: {
					time: 89355,
					text: 'Đằng sau chữ yêu đây là thương',
				},
			},
		]

		const line1Pos = new OsbVector2(80, 180),
			line2Pos = new OsbVector2(260, 300)

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

	#_secondHalf() {
		let startTime = 92167,
			endTime = 101855

		let lyrics = [
			{
				start: 92167,
				end: 93417,
				text: 'When you call me a baby,',
			},
			{
				start: 93730,
				end: 94667,
				text: 'make me so crazy',
			},
			{
				start: 94980,
				end: 96855,
				text: 'My heart is breaking slowly',
			},
			{
				start: 97167,
				end: 99042,
				text: 'Chầm chậm bờ môi khẽ trôi',
			},
			{
				start: 99355,
				end: 101230,
				text: 'Ôi mình yêu thật rồi!',
			},
		]

		// measure
		let maxWidth = 0,
			maxHeight = 0

		lyrics.forEach((line) => {
			const texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			maxHeight = Math.max(maxHeight, texture.height * 0.6)
			maxWidth = Math.max(maxWidth, texture.width * 0.6)
		})

		lyrics.forEach((line) => {
			const texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)
			sprite.ColorAtTime(line.start, Color.BlackCoffee)
			sprite.ScaleAtTime(line.start, 0.6)
			sprite.FadeAtTime(line.end + beat, 0)
			sprite.Fade(line.start, line.start + beat / 2, 0, 1)
			sprite.Fade(line.end - beat / 2, line.end, 1, 0)
			sprite.FadeAtTime(endTime, 0)

			this.registerComponents(sprite)
		})

		//#region bars
		startTime = 91855

		const startThickness = 70 + 187,
			endThickness = 400 + 187

		let startTransition = 100605
		let angle = degToRad(30)

		const topBar = new Sprite('sb/px.png', Layer.Background, Origin.TopRight)
		topBar.ScaleVec(startTime, startTime + beat, new OsbVector2(854, 0), new OsbVector2(854, startThickness), Easing.OutExpo)
		topBar.FadeAtTime(startTime, 1)
		topBar.FadeAtTime(endTime, 0)
		topBar.MoveAtTime(startTime, new OsbVector2(747, -187))
		topBar.Rotate(startTime + beat, startTransition, 0, degToRad(3))
		topBar.Rotate(startTransition, startTransition + beat, degToRad(3), angle, Easing.InCubic)
		topBar.ScaleVec(startTime + beat, startTransition, new OsbVector2(854, startThickness), new OsbVector2(854, startThickness + 10))
		topBar.ScaleVec(
			startTransition,
			startTransition + beat,
			new OsbVector2(854, startThickness + 10),
			new OsbVector2(854, endThickness),
			Easing.InCubic
		)
		// topBar.Color(startTransition, startTransition + beat, Color.White, Color.TeaGreen, Easing.InCubic)

		const bottomBar = new Sprite('sb/px.png', Layer.Background, Origin.BottomLeft)
		bottomBar.ScaleVec(startTime, startTime + beat, new OsbVector2(854, 0), new OsbVector2(854, startThickness), Easing.OutExpo)
		bottomBar.FadeAtTime(startTime, 1)
		bottomBar.FadeAtTime(endTime, 0)
		bottomBar.MoveAtTime(startTime, new OsbVector2(-107, 667))
		bottomBar.Rotate(startTime + beat, startTransition, 0, degToRad(3))
		bottomBar.Rotate(startTransition, startTransition + beat, degToRad(3), angle, Easing.InCubic)
		bottomBar.ScaleVec(startTime + beat, startTransition, new OsbVector2(854, startThickness), new OsbVector2(854, startThickness + 10))
		bottomBar.ScaleVec(
			startTransition,
			startTransition + beat,
			new OsbVector2(854, startThickness + 10),
			new OsbVector2(854, endThickness),
			Easing.InCubic
		)
		// bottomBar.Color(startTransition, startTransition + beat, Color.White, Color.TeaGreen, Easing.InCubic)

		const leftBar = new Sprite('sb/px.png', Layer.Background, Origin.TopLeft)
		leftBar.ScaleVec(startTime, startTime + beat, new OsbVector2(0, 854), new OsbVector2(startThickness, 854), Easing.OutExpo)
		leftBar.FadeAtTime(startTime, 1)
		leftBar.FadeAtTime(endTime, 0)
		leftBar.MoveAtTime(startTime, new OsbVector2(-107, -187))
		leftBar.Rotate(startTime + beat, startTransition, 0, degToRad(3))
		leftBar.Rotate(startTransition, startTransition + beat, degToRad(3), angle, Easing.InCubic)
		leftBar.ScaleVec(startTime + beat, startTransition, new OsbVector2(startThickness, 854), new OsbVector2(startThickness + 10, 854))
		leftBar.ScaleVec(
			startTransition,
			startTransition + beat,
			new OsbVector2(startThickness + 10, 854),
			new OsbVector2(endThickness, 854),
			Easing.InCubic
		)
		// leftBar.Color(startTransition, startTransition + beat, Color.White, Color.TeaGreen, Easing.InCubic)

		const rightBar = new Sprite('sb/px.png', Layer.Background, Origin.BottomRight)
		rightBar.ScaleVec(startTime, startTime + beat, new OsbVector2(0, 480), new OsbVector2(startThickness, 854), Easing.OutExpo)
		rightBar.FadeAtTime(startTime, 1)
		rightBar.FadeAtTime(endTime, 0)
		rightBar.MoveAtTime(startTime, new OsbVector2(747, 667))
		rightBar.Rotate(startTime + beat, startTransition, 0, degToRad(3))
		rightBar.Rotate(startTransition, startTransition + beat, degToRad(3), angle, Easing.InCubic)
		rightBar.ScaleVec(startTime + beat, startTransition, new OsbVector2(startThickness, 854), new OsbVector2(startThickness + 10, 854))
		rightBar.ScaleVec(
			startTransition,
			startTransition + beat,
			new OsbVector2(startThickness + 10, 854),
			new OsbVector2(endThickness, 854),
			Easing.InCubic
		)
		// rightBar.Color(startTransition, startTransition + beat, Color.White, Color.TeaGreen, Easing.InCubic)

		this.registerComponents(topBar, bottomBar, leftBar, rightBar)
		//#endregion
	}

	#_startSceneTransition() {
		const angle = 10,
			thickness = 40,
			color = Color.LightPink

		const startTime = 82480

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

	#_midSceneTransition() {
		const startTime = 91542,
			endTime = 92480

		const top = new Sprite('sb/px.png', Layer.Background, Origin.BottomCenter)
		top.FadeAtTime(startTime, 1)
		top.FadeAtTime(endTime, 0)
		top.RotateAtTime(startTime, degToRad(10))
		top.ScaleVecAtTime(startTime, new OsbVector2(1200, 480))
		top.ColorAtTime(startTime, Color.BabyBlueEyes)
		top.MoveY(startTime, startTime + beat, 0, 240, Easing.OutExpo)

		const bottom = new Sprite('sb/px.png', Layer.Background, Origin.TopCenter)
		bottom.FadeAtTime(startTime, 1)
		bottom.FadeAtTime(endTime, 0)
		bottom.RotateAtTime(startTime, degToRad(10))
		bottom.ScaleVecAtTime(startTime, new OsbVector2(1200, 480))
		bottom.ColorAtTime(startTime, Color.BabyBlueEyes)
		bottom.MoveY(startTime, startTime + beat, 480, 240, Easing.OutExpo)

		this.registerComponents(top, bottom)
	}

	#_endSceneTransition() {
		const startTime = 101230
		const square = new Sprite('sb/px.png', Layer.Background)

		square.ColorAtTime(startTime, Color.LightPink)
		square.Rotate(startTime, startTime + beat, degToRad(35), 0, Easing.OutCubic)
		square.Scale(startTime, startTime + beat, 0, 854, Easing.OutCubic)
		square.FadeAtTime(startTime, 1)
		square.FadeAtTime(102480, 0)

		this.registerComponents(square)
	}

	#_bg() {
		const startTime = 82480,
			endTime = 101542,
			startTime2 = 92480

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.FadeAtTime(endTime, 0)
		bg.ColorAtTime(startTime, Color.Black)
		bg.ColorAtTime(startTime2, Color.BabyBlueEyes)

		this.registerComponents(bg)
	}

	#_bubbles() {
		const startTime = 82480,
			endTime = 92480

		// spawn every half beat
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
}
