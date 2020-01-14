function fillgenerictable(data, p) {
    if (data.length == 0) {
        $(`#${p.field_id}`).html("<div class='text-center mt-4'><b>Nenhum fluxo de caixa adicionado.</b></div>")
        return
    }
    if (p && p.fields) {
        let thead = ""
        let tbody = ""
        let table = ""
        for (j in data) {
            let row = data[j]
            let tr = ""
            for (i in p.fields) {
                field_title = i
                let field_db = p['fields'][i]
                if (typeof (p['fields'][i]) == 'object' && p['fields'][i]['field_db']) {
                    field_db = p['fields'][i]['field_db']
                    if (p['fields'][i]['callback']) {
                        tr += `<td>${p['fields'][i]['callback'](row[field_db])}</td>`
                    }
                } else {
                    tr += `<td>${row[field_db]}</td>`
                }
            }
            if (p.params && p.params['remove']) {
                tbody += `<tr>${tr}<td><button class='btn btn-danger btn-sm' onclick='${p.params['remove']['removeCallback']}(${data[j]['id']})' style='border-radius:20px'><span class='fa fa-trash'></span></button></td></tr>`
            } else {
                tbody += `<tr>${tr}</tr>`
            }
        }
        for (i in p.fields) {
            thead += `<th>${i}</th>`
        }
        table = `<table class='table text-sm table-striped' style='font-size:12px'><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>`
        if (p.field_id) {
            $(`#${p.field_id}`).html(table)
        }
    }
}