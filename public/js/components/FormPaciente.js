var FormPaciente = React.createClass({
    getInitialState: function() {
        return {_id: 0, nombre: '', apellido: '', esFumador: false};
    },
    getDataFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    sendStateToServerWithDebounce: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: this.state._id == 0 ? 'PUT' : 'POST',
            data: this.state,
            success: function(data) {
                this.setState(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.getDataFromServer();
    },
    componentWillMount: function() {
        this.sendStateToServerWithDebounce = _.debounce(this.sendStateToServerWithDebounce, 2000);
    },
    handleNombreChange: function (e){
        this.setState({nombre: e.target.value});
        this.sendStateToServerWithDebounce();
    },
    handleApellidoChange: function(e){
        this.setState({apellido: e.target.value});
        this.sendStateToServerWithDebounce();
    },
    handleEsFumadorChange: function(e){
        this.setState({esFumador: e.target.checked});
        this.sendStateToServerWithDebounce();
    },
    render: function() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="nombre" className="col-sm-2 control-label">Nombre</label>
                    <div className="col-sm-10">
                        <input  type="text" name="nombre" className="form-control" placeholder="nombre" title="nombre" 
                                value={this.state.nombre} onChange={this.handleNombreChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="apellido" className="col-sm-2 control-label">Apellido</label>
                    <div className="col-sm-10">
                        <input  type="text" name="apellido" className="form-control" placeholder="apellido" title="apellido" 
                                value={this.state.apellido} onChange={this.handleApellidoChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" checked={this.state.esFumador} onChange={this.handleEsFumadorChange} /> Es fumador?
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});  

var $formPacienteElement = $('#formPaciente');
var pacienteId = parseInt($formPacienteElement.data("paciente-id"));
ReactDOM.render(<FormPaciente url={"/api/pacientes/" + pacienteId} />, $formPacienteElement[0]);
