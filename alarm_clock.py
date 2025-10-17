from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.clock import Clock
from kivy.lang import Builder
import pyttsx3
import datetime
import threading
import time

Builder.load_string('''
<AlarmApp>:
    orientation: 'vertical'
    padding: 20
    spacing: 10

    Label:
        id: clock_label
        text: '00:00:00'
        font_size: 48
        halign: 'center'

    Label:
        text: 'Set Alarm (HH:MM)'
        font_size: 24

    TextInput:
        id: alarm_input
        multiline: False
        hint_text: 'e.g., 07:30'

    Button:
        text: 'Set Alarm'
        on_press: root.set_alarm()

    Label:
        id: status_label
        text: 'Alarm not set'
        font_size: 18
''')

class AlarmApp(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.alarm_time = None
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', 150)
        self.engine.setProperty('volume', 1.0)

    def update_clock(self, dt):
        now = datetime.datetime.now()
        self.ids.clock_label.text = now.strftime('%H:%M:%S')

    def set_alarm(self):
        alarm_str = self.ids.alarm_input.text
        try:
            hour, minute = map(int, alarm_str.split(':'))
            now = datetime.datetime.now()
            self.alarm_time = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
            if self.alarm_time < now:
                self.alarm_time += datetime.timedelta(days=1)
            self.ids.status_label.text = f'Alarm set for {self.alarm_time.strftime("%H:%M")}'
            threading.Thread(target=self.monitor_alarm).start()
        except ValueError:
            self.ids.status_label.text = 'Invalid time format. Use HH:MM'

    def monitor_alarm(self):
        while True:
            now = datetime.datetime.now()
            if self.alarm_time and now >= self.alarm_time:
                self.trigger_alarm()
                break
            time.sleep(1)

    def trigger_alarm(self):
        self.engine.say("Hey! It's morning, wake up now!")
        self.engine.runAndWait()

class MainApp(App):
    def build(self):
        self.alarm_app = AlarmApp()
        Clock.schedule_interval(self.alarm_app.update_clock, 1)
        return self.alarm_app

if __name__ == '__main__':
    MainApp().run()