const db = require('../config/database');

// CREATE
exports.createEtudiant = (req, res) => {
    const { nom, programme } = req.body;

    if (!nom || !programme) {
        return res.status(400).json({ message: 'Nom et programme sont obligatoires' });
    }

    db.run(
        "INSERT INTO etudiants (nom, programme) VALUES (?, ?)",
        [nom, programme],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });

            res.status(201).json({
                id: this.lastID,
                nom,
                programme
            });
        }
    );
};

// READ ALL
exports.getEtudiants = (req, res) => {
    db.all("SELECT * FROM etudiants ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// READ ONE
exports.getEtudiantById = (req, res) => {
    db.get(
        "SELECT * FROM etudiants WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ message: err.message });
            if (!row) return res.status(404).json({ message: 'Rival non trouvé' });
            res.json(row);
        }
    );
};

// UPDATE
exports.updateEtudiant = (req, res) => {
    const { nom, programme } = req.body;

    if (!nom || !programme) {
        return res.status(400).json({ message: 'Nom et programme sont obligatoires' });
    }

    db.run(
        "UPDATE etudiants SET nom = ?, programme = ? WHERE id = ?",
        [nom, programme, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'Rival non trouvé' });

            res.json({ message: 'Rival modifié avec succès' });
        }
    );
};

// DELETE
exports.deleteEtudiant = (req, res) => {
    db.run(
        "DELETE FROM etudiants WHERE id = ?",
        [req.params.id],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'Rival non trouvé' });

            res.json({ message: 'Rival supprimé avec succès' });
        }
    );
};
