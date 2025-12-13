function status(request, response) {
  response.status(200).json({ chave: "insomnia rpg"});
}

export default status;
