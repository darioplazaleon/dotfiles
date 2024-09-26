import matugen from "./matugen"
import hyprland from "./hyprland"
import tmux from "./tmux"
import gtk from "./gtk"
import notifications from "./notifications"

export default function init() {
    try {
        gtk()
        tmux()
        matugen()
        notifications()
        hyprland()
    } catch (error) {
        logError(error)
    }
}
