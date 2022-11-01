from openpyxl import load_workbook

def insert_row(file_name, row_data):
    try:
        wb = load_workbook("files/{file_name}.xlsx".format(file_name=file_name))
        ws = wb.worksheets[0]
        ws.append(row_data)
        wb.save("files/{file_name}.xlsx".format(file_name=file_name))
        return True
    except:
        return False

    