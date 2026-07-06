import HtmlIcon from '@mui/icons-material/Html'
import CssIcon from '@mui/icons-material/Css'
import JavascriptIcon from '@mui/icons-material/Javascript'
import HubIcon from '@mui/icons-material/Hub'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import BrushIcon from '@mui/icons-material/Brush'
import PaletteIcon from '@mui/icons-material/Palette'
import LayersIcon from '@mui/icons-material/Layers'
import WidgetsIcon from '@mui/icons-material/Widgets'
import CodeIcon from '@mui/icons-material/Code'
import DnsIcon from '@mui/icons-material/Dns'
import DataObjectIcon from '@mui/icons-material/DataObject'
import CoffeeIcon from '@mui/icons-material/Coffee'
import GitHubIcon from '@mui/icons-material/GitHub'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import StorageIcon from '@mui/icons-material/Storage'
import ExtensionIcon from '@mui/icons-material/Extension'

export const SKILL_ICON_MAP = {
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavascriptIcon,
  react: HubIcon,
  figma: GpsFixedIcon,
  photoshop: BrushIcon,
  illustrator: PaletteIcon,
  vue: LayersIcon,
  angular: WidgetsIcon,
  typescript: CodeIcon,
  node: DnsIcon,
  python: DataObjectIcon,
  java: CoffeeIcon,
  git: GitHubIcon,
  'react-native': PhoneIphoneIcon,
  mongodb: StorageIcon,
}

function SkillIcon({ icon, color, sx }) {
  const IconComponent = SKILL_ICON_MAP[icon] ?? ExtensionIcon
  return <IconComponent sx={{ color, fontSize: 28, ...sx }} />
}

export default SkillIcon
