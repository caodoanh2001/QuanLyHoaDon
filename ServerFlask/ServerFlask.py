 # -*- coding: utf-8 -*-
from flask import Flask, render_template, request
import json
from random import choice
from string import digits
from unidecode import unidecode
from utils import finddate

app = Flask(__name__)

with open('data.json', 'r') as f:
  data = json.load(f)
f.close()

def get_totalcost(receipts):
  total_cost = 0
  if len(receipts) > 0:

    for item in receipts:
      item_totalcost = item['totalcost']
      item_totalcost = str(unidecode(item_totalcost))
      item_totalcost = ''.join(filter(str.isdigit, item_totalcost))
      item_totalcost= item_totalcost.strip()
      item_totalcost = item_totalcost.replace(".", "")
      try:
        total_cost += int(item_totalcost)
      except:
        pass
  return total_cost
  
def get_types(receipts):
  receipts_type = {'market': 0, 'coffee': 0, 'others': 0}
  for item in receipts:
    receipts_type[item['name']] += 1
  total = receipts_type['market'] + receipts_type['coffee'] + receipts_type['others']
  receipts_type['market'] = int((float(receipts_type['market'])/total)*100)
  receipts_type['coffee'] = int((float(receipts_type['coffee'])/total)*100)
  receipts_type['others'] = int((float(receipts_type['others'])/total)*100)
  for key in receipts_type:
    if receipts_type[key] == 0:
      receipts_type[key] = 1
  return receipts_type

@app.route('/')
def hello_world():
    return data

@app.route('/login', methods=["GET", "POST"])
def return_data():
    with open('data.json', 'r') as f:
      data = json.load(f)
    if request.method == 'POST':
      response = request.json
      username = response['username']
      password = response['password']
      if username == '':
        return {'status': 'mis username'}
      if password == '':
        return {'status': 'mis password'}
      if username not in data:
        return {'status': 'not register'}
      if data[username]['password'] != password:
        return {'status': 'wrong pass'}
      if data[username]['password'] == password:
        return {'status': 'success'}

@app.route('/send-data', methods=["GET", "POST"])
def send_data():
    with open('data.json', 'r') as f:
      data = json.load(f)
    f.close()
    if request.method == 'POST':
      name_show = None
      response = request.json
      username = response['username']
      _id = ''.join(choice(digits) for i in range(12))
      name = response['name']
      buyer = response['buyer'].strip()
      seller = response['seller'].strip()
      address = response['address'].strip()
      timestamp = finddate(response['timestamp'])
      totalcost = response['totalcost']
      # trường hợp ko phát hiện được thông tin
      if seller == None or seller == '':
        seller = 'N/A'
      
      if address == None or address == '':
        address = 'N/A'
      
      if timestamp == None or timestamp == '':
        timestamp = 'N/A'
      
      if totalcost == None or totalcost == '':
        totalcost = 'N/A'
        
      picture = response['picture']
      if response['name'] == 'market':
        name_show = 'Đi chợ'
      elif response['name'] == 'coffee':
        name_show = 'Cà phê'
      else:
        name_show = 'Khác'
      newdata = {'_id': _id, 'name': name, 'buyer': buyer, 'seller': seller,
      'address': address, 'timestamp': timestamp, 'totalcost': totalcost, '__v': 0, 'picture': picture, 'name_show': name_show}
      data[username]['receipts'].append(newdata)
      with open('data.json', 'w') as f:
        json.dump(data, f)
      f.close()
      return newdata
      
@app.route('/update', methods=["GET", "POST"])
def update_data():
    if request.method == 'POST':
      with open('data.json', 'r') as f:
        data = json.load(f)
      f.close()
      response = request.json
      # Thay doi hoa don
      receipts = data[response['username']]['receipts']
      receipt_need_edit = next(item for item in receipts if item['_id'] == response['id'])
      receipt_need_edit['name'] = response['name']
      receipt_need_edit['buyer'] = response['buyer']
      receipt_need_edit['picture'] = response['picture']
      receipt_need_edit['seller'] = response['seller']
      receipt_need_edit['address'] = response['address']
      receipt_need_edit['timestamp'] = response['timestamp']
      receipt_need_edit['totalcost'] = response['totalcost']
      data[response['username']]['receipts'] = receipts
      with open('data.json', 'w') as f:
        json.dump(data, f)
      f.close()
      return response
    
@app.route('/delete', methods=["GET", "POST"])
def delete_data():
    if request.method == 'POST':
      with open('data.json', 'r') as f:
        data = json.load(f)
      f.close()
      response = request.json
      for receipt in data[response['username']]['receipts']:
        if receipt['_id'] == response['id']:
          removed_receipt = receipt
          break
      
      # Xoa hoa don do di
      data[response['username']]['receipts'].remove(removed_receipt)
      
      with open('data.json', 'w') as f:
        json.dump(data, f)
      f.close()
      return removed_receipt

@app.route('/get_user', methods=["GET", "POST"]) 
def get_user():
    with open('data.json', 'r') as f:
      data = json.load(f)
    f.close()
    if request.method == 'POST':
      username = request.json['username']
      # print(data[username]['data'])
      return data[username]
      
@app.route('/register', methods=["GET", "POST"])
def register():
    with open('data.json', 'r') as f:
      data = json.load(f)
    f.close()
    if request.method == 'POST':
      username = request.json['username']
      password = request.json['password']
      password2 = request.json['password2']
      print(username, password, password2)
      if username == '':
        return {'status': 'mis username'}
      if password == '' or password2 == '':
        return {'status': 'mis pass'}
      if not (password == password2):
        return {'status': 'mis match'}
      new_data = {'password': password, 'receipts':[]}
      data[username] = new_data
      with open('data.json', 'w') as f:
        json.dump(data, f)
      f.close()
      return {'status': 'done'}

@app.route('/query', methods=["GET", "POST"])
def query():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    # truong hop khong co ngay query
    query = request.json
    username = query['username']
    if query['query_day'] == '' and query['query_month'] == '' and query['query_year'] == '':
      total_receipts = len(data[username]['receipts'])
      total_cost = int(get_totalcost(data[username]['receipts'])/1000)
      count_types = get_types(data[username]['receipts'])
      return {'total_receipts': str(total_receipts), 'total_cost': str(total_cost) + 'K', 'market': str(count_types['market']), 'coffee': str(count_types['coffee']), 'others': str(count_types['others'])}
    else:
      if query['query_day'] == '' and query['query_month'] == '':
        # thống kê theo năm
        data_user = data[username]["receipts"]
        queries = []
        for receipt in data_user:
          if "timestamp" in receipt:
            try:
              day, month, year = receipt['timestamp'].split('-')
              if int(year) == int(query['query_year']):
                queries.append(receipt)
            except:
              pass

      elif query['query_day'] == '':
        # thống kê theo tháng, năm
        data_user = data[username]["receipts"]
        queries = []
        for receipt in data_user:
          if "timestamp" in receipt:
            try:
              day, month, year = receipt['timestamp'].split('-')
              if (int(year) == int(query['query_year'])) and (int(month) == int(query['query_month'])):
                queries.append(receipt)
            except:
              pass

      else:
        # thống kê theo ngày, tháng, năm
        data_user = data[username]["receipts"]
        queries = []
        for receipt in data_user:
          if "timestamp" in receipt:
            try:
              day, month, year = receipt['timestamp'].split('-')
              if (int(year) == int(query['query_year'])) and (int(month) == int(query['query_month'])) and (int(day) == int(query['query_day'])):
                queries.append(receipt)
            except:
              pass

      if not queries:
        return {'total_receipts': '0', 'total_cost': '0', 'market': '0', 'coffee': '0', 'others': '0'}

      total_receipts = len(queries)
      total_cost = int(get_totalcost(queries)/1000)
      count_types = get_types(queries)

      return {'total_receipts': str(total_receipts), 'total_cost': str(total_cost) + 'K', 'market': str(count_types['market']), 'coffee': str(count_types['coffee']), 'others': str(count_types['others'])}

@app.route('/chart', methods=["GET", "POST"])
def chart():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    query = request.json
    username = query['username']
    data_user = data[username]['receipts']
    # loc theo nam
    queries = {}
    for receipt in data_user:
      try:
        day, month, year = receipt['timestamp'].split('-')
        if year not in queries:
          queries[year] = [receipt]
        else:
          queries[year].append(receipt)
      except:
        print('Error')
    
    year = None
    years = queries.keys()
    years = sorted(years)
    year = years[-1]
    curr_query = queries[year]
    # loc theo thang
    queries = {}
    for receipt in curr_query:
      try:
        day, month, year = receipt['timestamp'].split('-')
        if month not in queries:
          queries[month] = [receipt]
        else:
          queries[month].append(receipt)
      except:
        print('Error')
    
    months = queries.keys()
    months = sorted(months)
    final_queries = []
    labels = []
    if len(months) >= 5:
      labels = ['Tháng ' + str(int(m)) for m in months[-5:]]
      final_queries = [get_totalcost(queries[m]) for m in months[-5:]]
    else:
      labels = ['Tháng ' + str(int(m)) for m in months]
      final_queries = [get_totalcost(queries[m]) for m in months]
    
    final_queries = [int(f/1000) for f in final_queries]

  return {'labels': labels, 'final_queries': final_queries}

@app.route('/changepass', methods=["GET", "POST"])
def changepass():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    query = request.json
    username = query['username']
    password_old = query['password_old']
    password = query['password']
    password2 = query['password2']
    if not (password_old == data[username]['password']):
      return {'status': 'wrong pass'}
    elif password_old == '':
      return {'status': 'mis oldpass'}
    elif password == '' or password2 == '':
      return {'status': 'mis pass'}
    elif not (password == password2):
      return {'status': 'mis match'}
    else:
      data[username]['password'] = password
    
      with open('data.json', 'w') as f:
        json.dump(data, f)
      f.close()

  return {'status': 'done'}

@app.route('/changeavatar', methods=["GET", "POST"])
def change_avatar():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    query = request.json
    username = query['username']
    img_url = query['img_url']
    data[username]['avatar'] = img_url

    with open('data.json', 'w') as f:
        json.dump(data, f)
    f.close()
  return {}

@app.route('/getavatar', methods=["GET", "POST"])
def get_avatar():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    query = request.json
    username = query['username']
  return {'img_url': data[username]['avatar']}


@app.route('/changecover', methods=["GET", "POST"])
def change_cover():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    query = request.json
    username = query['username']
    img_url = query['img_url']
    data[username]['cover'] = img_url

    with open('data.json', 'w') as f:
        json.dump(data, f)
    f.close()
  return {}

@app.route('/getcover', methods=["GET", "POST"])
def get_cover():
  with open('data.json', 'r') as f:
      data = json.load(f)
  f.close()
  if request.method == 'POST':
    query = request.json
    username = query['username']
  return {'img_url': data[username]['cover']}

app.run(host='0.0.0.0', port=5000)