 # -*- coding: utf-8 -*-
import re
from datetime import datetime
import datefinder
import io
def finddate(str_date):
  letters = io.open("letters", mode="r", encoding="utf-8").read()
  for char in letters:
      str_date = str_date.replace(char, "")
      str_date = str_date.strip()
  date = None
  
  format = ['%d.%m.%Y', '%d-%m-%Y', '%d/%m/%Y']
  for f in format:
    match = re.search(r'\d{2}.\d{2}.\d{4}', str_date)
    try:
      date = datetime.strptime(match.group(), f).date()
    except:
      pass
  
  if date == None:
    matches = list(datefinder.find_dates(str_date))
    if len(matches) > 0:
      date = matches[0]
      date = date.strftime("%d-%m-%Y")
      date = date.split('-')
      if int(date[1]) > 12:
        date = '-'.join([date[1], date[0], date[-1]])
      else:
        date = '-'.join([date[0], date[1], date[-1]])
    return date
  else:
    date = date.strftime("%d-%m-%Y")
    date = date.split('-')
    if int(date[1]) > 12:
      date = '-'.join([date[1], date[0], date[-1]])
    else:
      date = '-'.join([date[0], date[1], date[-1]])
    return date