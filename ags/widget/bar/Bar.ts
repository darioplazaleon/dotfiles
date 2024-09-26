import Date from "./buttons/Date"
import Systray from "./buttons/SysTray"
import Workspaces from "./buttons/Workspaces"
import Taskbar from "./buttons/Taskbar"
import Media from "./buttons/Media"
import PowerMenu from "./buttons/PowerMenu"
import Messages from "./buttons/Messages"
import options from "options"
import SystemIndicators from "./buttons/SystemIndicators"

const { start, center, end } = options.bar.layout
const { transparent, position } = options.bar

export type BarWidget = keyof typeof widget

const widget = {
    date: Date,
    systray: Systray,
    system: SystemIndicators,
    workspaces: Workspaces,
    taskbar: Taskbar,
    media: Media,
    powermenu: PowerMenu,
    messages: Messages,
    expander: () => Widget.Box({ expand: true }),
}

export default (monitor: number) => Widget.Window({
    monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    anchor: position.bind().as(pos => [pos, "right", "left"]),
    child: Widget.CenterBox({
        css: "min-width: 2px; min-height: 2px;",
        startWidget: Widget.Box({
            hexpand: true,
            children: start.bind().as(s => s.map(w => widget[w]())),
        }),
        centerWidget: Widget.Box({
            hpack: "center",
            children: center.bind().as(c => c.map(w => widget[w]())),
        }),
        endWidget: Widget.Box({
            hexpand: true,
            children: end.bind().as(e => e.map(w => widget[w]())),
        }),
    }),
    setup: self => self.hook(transparent, () => {
        self.toggleClassName("transparent", transparent.value)
    }),
})