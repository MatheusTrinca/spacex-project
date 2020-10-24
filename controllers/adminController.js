const Launch = require('../models/Launch');

exports.showAdminLaunch = (req, res) => {
  const editMode = req.query.edit;
  if(!editMode){
    res.render('admin/admin-launch', {
      title: 'Admin Lançamento',
      path: '/admin/admin-launch',
      editMode: false,
      favoritedMode: false,
    });
  }else{
    const id = req.params.id;
    Launch.findById(id, launch => {
    res.render('admin/admin-launch', {
      title: 'Editar Lançamento',
      path: '/admin/launches-edit',
      editMode,
      favoritedMode: false,
      launch
    })
  });  // Popular os campos

  }
}

exports.addLaunch = (req, res) => {
  const newLaunch = new Launch(
    null,
    req.body.mission,
    req.body.date,
    req.body.description,
    req.body.duration,
    req.body.astronaut1,
    req.body.astronaut2,
  )
  newLaunch.save();
  res.redirect('/launches');
}

exports.launchesEdit = (req, res) => {
  Launch.fetchAll(launches => {
    res.render('admin/launches-edit', {
      title: 'Editar Lançamento',
      path: '/admin/launches-edit',
      editMode: true,
      favoritedMode: false,
      launches
    })
  })
}

exports.editedLaunch = (req, res) => {
  const updatedLaunch = new Launch(
    req.body.id,
    req.body.mission,
    req.body.date,
    req.body.description,
    req.body.duration,
    req.body.astronaut1,
    req.body.astronaut2,
  )
  updatedLaunch.save();
  res.redirect('/admin/launches-edit');
}

exports.deleteLaunch = (req, res) => {
  const id = req.body.id;
  Launch.delete(id);
  res.redirect('/admin/launches-edit');
}

