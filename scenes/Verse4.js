import { degToRad } from '@osbjs/math'
import { Easing, Layer, Origin, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import { Color } from '../lib/pallete.js'
import { biggerTxtgen } from '../lib/txtgen.js'
import { beat } from '../osbjs.config.js'

export class Verse4 extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.#_bg()
		this.#_line1()
		this.#_line2()
		this.#_line3()
		this.#_line4()
		this.#_line5()
		this.#_line6()
		this.#_endSceneTransition()
	}

	#_line1() {
		const endTime = 104355

		let lyrics = [
			[
				{
					text: 'Tình',
					time: 101542,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x - 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
				{
					text: 'cờ',
					time: 101855,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y - 50, y, Easing.OutCubic)
						sprite.MoveXAtTime(word.time, x)
					},
				},
				{
					text: 'biết',
					time: 102167,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 50, y, Easing.OutCubic)
						sprite.MoveXAtTime(word.time, x)
					},
				},
			],
			[
				{
					text: 'nhớ',
					time: 102480,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x - 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
				{
					text: 'những lúc',
					time: 102792,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 50, y, Easing.OutCubic)
						sprite.MoveXAtTime(word.time, x)
					},
				},
			],
			[
				{
					text: 'ngây',
					time: 103261,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
				{
					text: 'thơ',
					time: 103573,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
			],
		]

		let startX,
			startY = 0

		lyrics.forEach((line) => {
			startX = 100

			line.forEach((word) => {
				const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

				const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
				sprite.ScaleAtTime(word.time, 0.5)
				if (word.fadeIn) {
					word.fadeIn(sprite, word)
				} else {
					sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
				}
				sprite.Fade(endTime, endTime + beat / 2, 1, 0, Easing.OutExpo)

				if (word.transformation) {
					word.transformation(sprite, word, startX, startY)
				} else {
					sprite.MoveXAtTime(word.time, startX)
					sprite.MoveYAtTime(word.time, startY)
				}

				this.registerComponents(sprite)

				startX += texture.width * 0.5
			})

			startY += 110
		})
	}

	#_line2() {
		const endTime = 106855

		let lyrics = [
			[
				{
					text: 'Lắm',
					time: 104667,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x - 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
				{
					text: 'lúc',
					time: 104980,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y - 50, y, Easing.OutCubic)
						sprite.MoveXAtTime(word.time, x)
					},
				},
			],
			[
				{
					text: 'chỉ biết',
					time: 105292,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x + 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
			],
			[
				{
					text: 'vu',
					time: 105761,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
				{
					text: 'vơ',
					time: 106073,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
			],
		]

		let startX,
			startY = 0

		lyrics.forEach((line) => {
			startX = 100

			line.forEach((word) => {
				const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

				const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
				sprite.ScaleAtTime(word.time, 0.5)
				if (word.fadeIn) {
					word.fadeIn(sprite, word)
				} else {
					sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
				}
				sprite.Fade(endTime, endTime + beat / 2, 1, 0, Easing.OutExpo)

				if (word.transformation) {
					word.transformation(sprite, word, startX, startY)
				} else {
					sprite.MoveXAtTime(word.time, startX)
					sprite.MoveYAtTime(word.time, startY)
				}

				this.registerComponents(sprite)

				startX += texture.width * 0.5
			})

			startY += 110
		})
	}

	#_line3() {
		const endTime = 111855
		let lyrics = [
			[
				{
					text: 'Bơ',
					time: 107167,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x - 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
				{
					text: 'vơ',
					time: 107480,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y - 50, y, Easing.OutCubic)
						sprite.MoveXAtTime(word.time, x)
					},
				},
			],
			[
				{
					text: 'lạc',
					time: 108105,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x - 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
				{
					text: 'trong',
					time: 108417,
					transformation(sprite, word, x, y) {
						sprite.MoveX(word.time, word.time + beat, x + 50, x, Easing.OutCubic)
						sprite.MoveYAtTime(word.time, y)
					},
				},
			],
			[
				{
					text: 'những',
					time: 108730,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
				{
					text: 'giấc',
					time: 109198,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
				{
					text: 'mơ',
					time: 109667,
					transformation(sprite, word, x, y) {
						sprite.MoveY(word.time, word.time + beat, y + 20, y, Easing.OutBack)
						sprite.MoveXAtTime(word.time, x)
					},
					fadeIn(sprite, word) {
						sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
					},
				},
			],
		]

		let startX,
			startY = 0

		lyrics.forEach((line) => {
			startX = 100

			line.forEach((word) => {
				const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

				const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
				sprite.ScaleAtTime(word.time, 0.5)
				sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
				sprite.Fade(endTime, endTime + beat, 1, 0, Easing.OutExpo)

				if (word.transformation) {
					word.transformation(sprite, word, startX, startY)
				} else {
					sprite.MoveXAtTime(word.time, startX)
					sprite.MoveYAtTime(word.time, startY)
				}

				sprite.MoveY(endTime, endTime + beat, startY, startY - 10, Easing.OutExpo)
				sprite.MoveX(endTime, endTime + beat, startX, startX + 10, Easing.OutExpo)

				this.registerComponents(sprite)

				startX += texture.width * 0.5
			})

			startY += 110
		})
	}

	#_line4() {
		let lyrics = [
			{
				endTime: 113417,
				lyrics: [
					[
						{
							text: 'Lắm lúc',
							time: 112480,
							transformation(sprite, x, y) {
								sprite.MoveX(112480, 112480 + beat, x - 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(112480, y)
							},
						},
					],
					[
						{
							text: 'chỉ muốn nói',
							time: 112792,
							transformation(sprite, x, y) {
								sprite.MoveY(112792, 112792 + beat, y + 30, y, Easing.OutCubic)
								sprite.MoveXAtTime(112792, x)
							},
						},
					],
				],
			},
			{
				fadeOut: true,
				endTime: 114667,
				lyrics: [
					[
						{
							text: 'anh',
							time: 113417,
							transformation(sprite, x, y) {
								sprite.MoveY(113417, 113417 + beat, y - 30, y, Easing.OutCubic)
								sprite.MoveXAtTime(113417, x)
							},
						},
						{
							text: 'mãi',
							time: 113730,
							transformation(sprite, x, y) {
								sprite.MoveX(113730, 113730 + beat, x + 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(113730, y)
							},
						},
					],
					[
						{
							text: 'thương em',
							time: 114042,
							transformation(sprite, x, y) {
								sprite.MoveY(114042, 114042 + beat, y + 30, y, Easing.OutCubic)
								sprite.MoveXAtTime(114042, x)
							},
						},
					],
				],
			},
		]

		let startX, startY

		lyrics.forEach((group) => {
			startY = 100
			group.lyrics.forEach((line) => {
				startX = 100

				line.forEach((word) => {
					const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

					const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
					sprite.ScaleAtTime(word.time, 0.5)
					sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)

					if (group.fadeOut) {
						sprite.Fade(group.endTime, group.endTime + beat / 2, 1, 0, Easing.OutExpo)
						sprite.MoveY(group.endTime, group.endTime + beat, startY, startY - 10, Easing.OutExpo)
						sprite.MoveX(group.endTime, group.endTime + beat, startX, startX + 10, Easing.OutExpo)
					} else {
						sprite.FadeAtTime(group.endTime, 0)
					}

					if (!word.transformation) {
						sprite.MoveXAtTime(word.time, startX)
						sprite.MoveYAtTime(word.time, startY)
					} else {
						word.transformation(sprite, startX, startY)
					}

					this.registerComponents(sprite)

					startX += texture.width * 0.5
				})

				startY += 110
			})
		})
	}

	#_line5() {
		let lyrics = [
			{
				y: 0,
				endTime: 116230,
				lyrics: [
					[
						{
							text: 'Nhưng',
							time: 114823,
							transformation(sprite, x, y) {
								sprite.MoveY(114823, 114823 + beat, y - 30, y, Easing.OutCubic)
								sprite.MoveXAtTime(114823, x)
							},
						},
					],
					[
						{
							text: 'trong tim',
							time: 115136,
							transformation(sprite, x, y) {
								sprite.MoveX(115136, 115136 + beat, x - 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(115136, y)
							},
						},
					],
					[
						{
							text: 'bâng khuâng',
							time: 115448,
							transformation(sprite, x, y) {
								sprite.MoveX(115448, 115448 + beat, x + 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(115448, y)
							},
						},
					],
					[
						{
							text: 'chẳng',
							time: 115917,
							transformation(sprite, x, y) {
								sprite.MoveX(115917, 115917 + beat, x + 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(115917, y)
							},
						},
					],
				],
			},
			{
				fadeOut: true,
				y: 100,
				endTime: 117167,
				lyrics: [
					[
						{
							text: 'có ai',
							time: 116230,
							transformation(sprite, x, y) {
								sprite.MoveX(116230, 116230 + beat, x - 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(116230, y)
							},
						},
					],
					[
						{
							text: 'xem này',
							time: 116698,
							transformation(sprite, x, y) {
								sprite.MoveX(116698, 116698 + (beat * 3) / 4, x + 30, x, Easing.OutCubic)
								sprite.MoveYAtTime(116698, y)
							},
						},
					],
				],
			},
		]

		let startX, startY

		lyrics.forEach((group) => {
			startY = group.y
			group.lyrics.forEach((line) => {
				startX = 100

				line.forEach((word) => {
					const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

					const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
					sprite.ScaleAtTime(word.time, 0.5)
					sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)

					if (group.fadeOut) {
						sprite.Fade(group.endTime, group.endTime + beat / 2, 1, 0, Easing.OutExpo)
						sprite.MoveY(group.endTime, group.endTime + beat, startY, startY - 10, Easing.OutCubic)
						sprite.MoveX(group.endTime, group.endTime + beat, startX, startX + 10, Easing.OutCubic)
					} else {
						sprite.FadeAtTime(group.endTime, 0)
					}

					if (!word.transformation) {
						sprite.MoveXAtTime(word.time, startX)
						sprite.MoveYAtTime(word.time, startY)
					} else {
						word.transformation(sprite, startX, startY)
					}

					this.registerComponents(sprite)

					startX += texture.width * 0.5
				})

				startY += 110
			})
		})
	}

	#_line6() {
		const endTime = 121230
		let lyrics = [
			{
				left: true,
				x: 100,
				lyrics: [
					[
						{
							text: 'chữ',
							time: 117480,
						},
					],
					[
						{
							text: 'thương',
							time: 117792,
						},
					],
					[
						{
							text: 'nặng',
							time: 118105,
						},
					],
					[
						{
							text: 'lắm',
							time: 118417,
						},
					],
				],
			},
			{
				x: 380,
				lyrics: [
					[
						{
							text: 'đâu',
							time: 118730,
						},
					],
					[
						{
							text: 'thể',
							time: 119042,
						},
					],
					[
						{
							text: 'phơi',
							time: 119355,
						},
					],
					[
						{
							text: 'bày',
							time: 120292,
						},
					],
				],
			},
		]

		let startX, startY

		lyrics.forEach((group) => {
			startY = 0
			group.lyrics.forEach((line) => {
				startX = group.x

				line.forEach((word) => {
					const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

					const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft)
					sprite.ScaleAtTime(word.time, 0.5)
					sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)

					sprite.FadeAtTime(endTime, 0)

					// sprite.MoveXAtTime(word.time, startX)
					sprite.MoveX(word.time, word.time + beat, group.left ? startX + 30 : startX - 30, startX, Easing.OutCubic)
					sprite.MoveYAtTime(word.time, startY)

					this.registerComponents(sprite)

					startX += texture.width * 0.5
				})

				startY += 100
			})
		})
	}

	#_bg() {
		const startTime = 102480,
			endTime = 121230

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.FadeAtTime(endTime, 0)
		bg.ColorAtTime(startTime, Color.LightPink)

		this.registerComponents(bg)
	}

	#_endSceneTransition() {
		const startTime = 120605,
			endTime = 122480

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
