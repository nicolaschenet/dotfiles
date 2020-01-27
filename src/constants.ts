import os from 'os'
import path from 'path'

export const HOME = os.homedir()

const PROJECT_PATH = path.join(HOME, '.dotfiles')
const SRC_PATH = path.join(PROJECT_PATH, 'src')

export const DOTFILES_PATH = path.join(SRC_PATH, 'dotfiles')
export const FONTS_PATH = path.join(SRC_PATH, 'fonts')
export const SCRIPTS_PATH = path.join(SRC_PATH, 'scripts')
export const IMAGES_PATH = path.join(SRC_PATH, 'images')
