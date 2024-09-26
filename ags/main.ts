import "lib/session"
import "style/style"
import Bar from "widget/bar/Bar"
import PowerMenu from "widget/powermenu/PowerMenu"
import ScreenCorners from "widget/bar/ScreenCorners"
import NotificationPopups from "widget/notifications/NotificationPopups"
import Overview from "widget/overview/Overview"
import { forMonitors } from "lib/utils"
import options from "options"
import { setupQuickSettings } from "widget/quicksettings/QuickSettings"
import { setupDateMenu } from "widget/datemenu/DateMenu"
import init from "lib/init"


App.config({
    onConfigParsed: () => {
        setupQuickSettings(),
        setupDateMenu()
        init()
    },
    closeWindowDelay: {
        "quicksettings": options.transition.value,
        "datemenu": options.transition.value,
    },
    windows: () => [
        ...forMonitors(Bar),
        ...forMonitors(NotificationPopups),
        ...forMonitors(ScreenCorners),
        PowerMenu(),
        Overview(),
    ]
})