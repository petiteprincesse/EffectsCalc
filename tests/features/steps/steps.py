# -*- coding: utf-8 -*-
from behave import *
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.support.ui import Select


@step('открыть "{url}"')
def open_url(context, url):
    context.browser = webdriver.Chrome(ChromeDriverManager().install())
    context.browser.maximize_window()
    context.browser.get(url)


@step('нажать кнопку "{button_id}"')
def press_button(context, button_id):
    time.sleep(0.9)
    elem = context.browser.find_element_by_id(button_id)
    elem.click()


@step('заполнить поле "{input_id}" значением "{value}"')
def fill_input(context, input_id, value):
    time.sleep(0.9)
    elem = context.browser.find_element_by_id(input_id)
    elem.send_keys(value)


@step('сделать скриншот')
def screenshot(context):
    time.sleep(0.9)
    element = context.browser.find_element_by_tag_name('body')
    element.screenshot("screenshot_full1.png")
    # element.save_screenshot("screenshot_full.png")


@step('в селекте "{select_id}" выбрать "{visible_value}"')
def choose_select(context, select_id, visible_value):
    time.sleep(0.9)
    element = Select(context.browser.find_element_by_id(select_id))
    element.select_by_visible_text(visible_value)


@step('конец')
def fill_input(context):
    context.browser.quit()




