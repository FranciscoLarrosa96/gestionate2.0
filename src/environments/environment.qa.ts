export const environment = {
    production: false,
    hmr: false,
    pre_prod: false,
    dev_qa: true,
    local: false,
    API_LOG: 'http://192.168.100.134:8080/fava-auth/',
    API: 'http://192.168.100.134:8080/gestionate/',
    API_CONTROL: 'http://192.168.100.134:8080/gestionate-control/',
    APIFILE: 'http://192.168.100.134:8080/FileServlet/api/',
    URL: "http://192.168.100.134:8080/FileServlet/api/file/",
    URL2: "http://192.168.100.134:8080/FileServlet/api/fileFormularios/",
};

// Para generar el build usar este comando "ng build --configuration=qa"