import { Beatmap } from '@osbjs/osujs'
import { join } from 'path'

export const path = 'D:/games/osu!/Songs/beatmap-637747154705562780-audio'
export const diffFilename = 'Juky San - Phai Chang Em Da Yeu feat. RedT (smug nanachi) [sb].osu'
export const osbFilename = 'Juky San - Phai Chang Em Da Yeu feat. RedT (smug nanachi).osb'

const beatmap = new Beatmap(join(path, diffFilename))
export const beat = beatmap.timingPoints.find((tp) => tp.uninherited).beatLength
