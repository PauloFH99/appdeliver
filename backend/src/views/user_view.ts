import User from '../app/models/User';

export default {
	render(user: User) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			telefone : user.telefone,
			cep: user.cep,
			cpf: user.cpf,
			rua: user.rua,
			numero: user.numero,
			bairro: user.bairro,
			cidade: user.cidade,
			apelido: user.apelido
		};
	},

	renderMany(user: User[]) {
		return user.map(user => this.render(user))
	}
};