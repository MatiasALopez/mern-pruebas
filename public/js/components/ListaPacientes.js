var ListaPacientesItem = React.createClass({
    render: function() {
        var item = this.props.data;
        return (
            <tr>
                <td><a href={'/pacientes/' + item._id}>{item._id}</a></td>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.esFumador ? "Sí" : "No"}</td>
            </tr>
        );
    }
});

var ListaPacientes = React.createClass({
    getInitialState: function() {
        return {items: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(pacientes) {
                this.setState({items: pacientes});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var items = this.state.items.map(function (item) {
            return (
                <ListaPacientesItem key={item._id} data={item} />
            );
        });
        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Es fumador</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
});

ReactDOM.render(<ListaPacientes url="/api/pacientes" />, $("#listaPacientes")[0]);