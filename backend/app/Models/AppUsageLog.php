<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AppUsageLog extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'child_id',
        'app_name',
        'package_name',
        'duration',
        'date',
    ];

    /**
     * Get the child user this app usage log belongs to.
     */
    public function child()
    {
        return $this->belongsTo(User::class, 'child_id');
    }
}
