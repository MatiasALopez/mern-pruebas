var FormPaciente = React.createClass({
    getInitialState: function() {
        return {_id: this.props.pacienteId, nombre: '', apellido: '', esFumador: false};
    },
    isEditMode: function() {
        return this.props.pacienteId != 0;
    },
    generateAPIUrl: function(includeId) {
        return this.props.urlBase + (includeId ? this.state._id : '');  
    },
    getDataFromServer: function() {
        if (this.isEditMode()) {
            $.ajax({
                url: this.generateAPIUrl(true),
                dataType: 'json',
                cache: false,
                success: function(data) {
                    if (data) {
                        this.setState(data);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    },
    sendStateToServer: function() {
        if (this.state._id) {
            $.ajax({
                url: this.generateAPIUrl(this.isEditMode()),
                dataType: 'json',
                type: this.isEditMode() ? 'PUT' : 'POST',
                data: this.state,
                success: function(data) {
                    this.setState(data);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    },
    componentDidMount: function() {
        this.getDataFromServer();
    },
    componentWillMount: function() {
        this.sendStateToServerWithDebounce = _.debounce(this.sendStateToServer, 2000);
    },
    handleIdChange: function (e){
        this.setState({_id: parseInt(e.target.value)});
        if (!this.props.saveButton) {
            this.sendStateToServerWithDebounce();
        }
    },
    handleNombreChange: function (e){
        this.setState({nombre: e.target.value});
        if (!this.props.saveButton) {
            this.sendStateToServerWithDebounce();
        }
    },
    handleApellidoChange: function(e){
        this.setState({apellido: e.target.value});
        if (!this.props.saveButton) {
            this.sendStateToServerWithDebounce();
        }
    },
    handleEsFumadorChange: function(e){
        this.setState({esFumador: e.target.checked});
        if (!this.props.saveButton) {
            this.sendStateToServerWithDebounce();
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();

        this.sendStateToServer();
    },
    render: function() {
        var opts = {};
        if (this.isEditMode()) {
            opts['disabled'] = 'disabled';
        }
        var botonGuardar = '';
        if (this.props.saveButton) {
            botonGuardar = (
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <input type="submit" value="Guardar" />
                    </div>
                </div>
            );
        }
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre" className="col-sm-2 control-label">Id</label>
                    <div className="col-sm-10">
                        <input  type="text" name="id" className="form-control" placeholder="id" title="id" 
                                value={this.state._id} onChange={this.handleIdChange} {...opts} />
                    </div>
                </div>
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
                {botonGuardar}
            </form>
        );
    }
});  

var $formPacienteElement = $('#formPaciente');
var pacienteId = parseInt($formPacienteElement.data("paciente-id") || 0),
    saveButton = $formPacienteElement.data("save-button");
ReactDOM.render(
	<FormPaciente urlBase="/api/pacientes/" pacienteId={pacienteId} saveButton={saveButton} />,
	$formPacienteElement[0]
);
